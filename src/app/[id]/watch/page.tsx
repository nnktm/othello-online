'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import styles from '../../page.module.css';

type boardResponse = {
  board: {
    board: number[][];
    turn: number;
    black: string;
    white: string;
  };
};

const initialBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const DIRECTIONS = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];
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

const Watch = () => {
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const [turn, setTurn] = useState<number>(1);
  const [isBlack, setIsBlack] = useState(`blackPlayer`);
  const [isWhite, setIsWhite] = useState(`whitePlayer`);

  const params = useParams();
  const id = params.id as string;

  const handleFetchBoard = useCallback(async () => {
    const response = await fetch(`/api/separate?id=${id}`);
    const data: boardResponse = (await response.json()) as boardResponse;
    setBoard(data.board.board);
    setTurn(data.board.turn);
    setIsBlack(data.board.black);
    setIsWhite(data.board.white);
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      void handleFetchBoard();
    }, 2000);
    return () => clearInterval(interval);
  }, [handleFetchBoard]);

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

  return (
    <>
      <div className={styles.container}>
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
              <div key={`${x}-${y}`} className={styles.cell}>
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
                ) : color === 3 ? (
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
          <a href="/" className={styles.return}>
            メニューに戻る
          </a>
        </div>
      </div>
    </>
  );
};

export default Watch;
