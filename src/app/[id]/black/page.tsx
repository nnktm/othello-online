'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { BoardResponse } from '../../../constants';
import { DIRECTIONS, INITIAL_BOARD } from '../../../constants';
import styles from '../../../styles/page.module.css';
//[cy][cx]に石を置くことが可能かどうか判断し可能な場合trueを返す
const checkPutable = (cx: number, cy: number, board: number[][], turn: number) => {
  if (board[cy][cx] === 1 || board[cy][cx] === 2) {
    return false;
  }
  for (const direction of DIRECTIONS) {
    const dx = direction[0];
    const dy = direction[1];
    if (board[cy + dy] === undefined) continue;
    if (board[cy + dy][cx + dx] === 3 - turn) {
      for (let distance = 1; distance < 8; distance++) {
        if (board[cy + dy * distance] === undefined) break;
        if (board[cy + dy * distance][cx + dx * distance] === 0) break;
        if (board[cy + dy * distance][cx + dx * distance] === 3 - turn) continue;
        if (board[cy + dy * distance][cx + dx * distance] === turn) {
          return true;
        }
      }
    }
  }
  return false;
};
//石をおいてひっくり返す動作
const turnCell = (cx: number, cy: number, board: number[][], turn: number) => {
  const canTurn: [number, number][] = [];
  if (checkPutable(cx, cy, board, turn)) {
    for (const direction of DIRECTIONS) {
      const dx = direction[0];
      const dy = direction[1];
      for (let distance = 1; distance < 8; distance++) {
        if (board[cy + dy * distance] === undefined) break;
        if (board[cy + dy * distance][cx + dx * distance] === 0) break;
        if (board[cy + dy * distance][cx + dx * distance] === 3 - turn) continue;
        if (board[cy + dy * distance][cx + dx * distance] === turn) {
          canTurn.push([cy, cx]);
          for (let i = distance; i > 0; i--) canTurn.push([cy + dy * i, cx + dx * i]);
        }
      }
    }
  }
  for (const [y, x] of canTurn) {
    board[y][x] = turn;
  }
  return true;
};

const Black = () => {
  const [board, setBoard] = useState<number[][]>(INITIAL_BOARD);
  const [turn, setTurn] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPutting, setIsPutting] = useState(false);
  const [isBlack, setIsBlack] = useState(``);
  const [isWhite, setIsWhite] = useState(``);

  const params = useParams();
  const id = params.id as string;

  const handleFetchBoard = useCallback(async () => {
    const response = await fetch(`/api/separate?id=${id}`);
    const data: BoardResponse = (await response.json()) as BoardResponse;
    setBoard(data.board.board);
    setTurn(data.board.turn);
    setIsBlack(data.board.black);
    setIsWhite(data.board.white);
  }, [id]);

  useEffect(() => {
    if (isPutting || isLoading) return;
    const interval = setInterval(() => {
      void handleFetchBoard();
    }, 500);
    return () => clearInterval(interval);
  }, [handleFetchBoard, isPutting, isLoading]);

  const handleDeleteBoard = async () => {
    await fetch(`/api/separate?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    window.location.href = '/';
  };

  const handleUpdateBoard = async (updatedBoard: number[][], updatedTurn: number) => {
    setIsLoading(true);
    await fetch(`/api/separate?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, board: updatedBoard, turn: updatedTurn }),
    });
    await handleFetchBoard();
    setIsLoading(false);
    setIsPutting(false);
  };

  const boardReset = async () => {
    await fetch(`/api/separate?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, board: INITIAL_BOARD, turn: 1 }),
    });
    void handleFetchBoard();
  };

  const handleOnClick = async (x: number, y: number) => {
    if (isLoading || isPutting) return;
    if (turn === 2) return;
    if (board[y][x] !== 0 || checkPutable(x, y, board, turn) === false) {
      return;
    }
    setIsPutting(true);
    const newBoard = structuredClone(board);
    if (turnCell(x, y, newBoard, turn)) {
      newBoard[y][x] = turn;
    }
    const newTurn = 3 - turn;
    setBoard(newBoard);
    setTurn(newTurn);
    await handleUpdateBoard(newBoard, newTurn);
  };

  const boardView = structuredClone(board);
  const values = {
    blackCell: 0,
    whiteCell: 0,
    puttableCell: 0,
    nextPuttableCell: 0,
    isSkip: false,
    winner: 'none',
  };
  for (let cy = 0; cy < 8; cy++) {
    for (let cx = 0; cx < 8; cx++) {
      if (checkPutable(cx, cy, board, turn)) boardView[cy][cx] = 3;
    }
  }
  values.blackCell = boardView.flat().filter((num) => num === 1).length;
  values.whiteCell = boardView.flat().filter((num) => num === 2).length;
  values.puttableCell = boardView.flat().filter((num) => num === 3).length;

  if (values.whiteCell < values.blackCell) {
    values.winner = isBlack;
  } else if (values.blackCell < values.whiteCell) {
    values.winner = isWhite;
  } else {
    values.winner = '引き分け';
  }
  // スキップについての処理
  if (values.puttableCell === 0) {
    for (let cy = 0; cy < 8; cy++) {
      for (let cx = 0; cx < 8; cx++) {
        if (checkPutable(cx, cy, board, 3 - turn))
          values.nextPuttableCell = values.nextPuttableCell + 1;
      }
    }
    if (values.nextPuttableCell === 0) values.isSkip = true;
    else {
      setTurn(3 - turn);
    }
  }
  const isEnd =
    values.whiteCell === 0 ||
    values.blackCell === 0 ||
    values.whiteCell + values.blackCell === 64 ||
    values.isSkip === true;

  const handleEndUpdate = useCallback(async () => {
    setIsLoading(true);
    await fetch(`/api/end?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
        end: true,
        resultBlack: values.blackCell,
        resultWhite: values.whiteCell,
        result: values.winner,
      }),
    });
    setIsLoading(false);
  }, [id, values.blackCell, values.whiteCell, values.winner]);

  useEffect(() => {
    if (isEnd) {
      void handleEndUpdate();
    }
  }, [isEnd, handleEndUpdate]);

  return (
    <>
      <div className={styles.container}>
        {isWhite === `` ? (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h1>プレイヤーを待っています</h1>
              <p>プレイヤーの参加までしばらくお待ち下さい</p>
              <a href="/" className={styles.modalClose} onClick={handleDeleteBoard}>
                ゲームを削除して閉じる
              </a>
            </div>
          </div>
        ) : null}
        {isEnd ? (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h1>ゲーム終了</h1>
              </div>
              <p>
                黒の数{values.blackCell} 対 白の数{values.whiteCell}で
              </p>
              <h2>
                {values.winner === isWhite || values.winner === isBlack
                  ? `${JSON.stringify(values.winner)}の勝ち!!`
                  : '引き分け'}
              </h2>
              <a href="/" className={styles.modalClose}>
                閉じる
              </a>
            </div>
          </div>
        ) : null}
        <div className={styles.board}>
          {boardView.map((row, y) =>
            row.map((color, x) => (
              <div key={`${x}-${y}`} className={styles.cell} onClick={() => handleOnClick(x, y)}>
                {color === 1 ? (
                  <div
                    className={styles.stone}
                    style={{ backgroundColor: '#212b33', width: '70%', height: '70%' }}
                  />
                ) : color === 2 ? (
                  <div
                    className={styles.stone}
                    style={{ backgroundColor: 'white', width: '70%', height: '70%' }}
                  />
                ) : color === 3 && turn === 1 ? (
                  <div
                    className={styles.stone}
                    style={{ backgroundColor: '#d86161', width: '30%', height: '30%' }}
                  />
                ) : null}
              </div>
            )),
          )}
        </div>
        <div className={styles.infomation}>
          <div className={styles.showInformation}>
            <p>
              {turn === 1
                ? `${JSON.stringify(isBlack)}のターン`
                : `${JSON.stringify(isWhite)}のターン`}
            </p>{' '}
            <p>黒：{values.blackCell}枚</p>
            <p>白：{values.whiteCell}枚</p>
          </div>
          <button className={styles.reset} onClick={boardReset}>
            盤面をリセットする
          </button>
          <a href="/" className={styles.return}>
            メニューに戻る
          </a>
        </div>
      </div>
    </>
  );
};

export default Black;
