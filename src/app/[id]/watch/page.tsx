'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import GameEndModal from '../../../components/gameEndModal';
import SettingSidebar from '../../../components/settingSideber';
import type { BoardResponse } from '../../../constants';
import { DIRECTIONS, INITIAL_BOARD } from '../../../constants';
import { COLOR_SET_KEYS, colorSet } from '../../../constants/color';
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

const Watch = () => {
  const [board, setBoard] = useState<number[][]>(INITIAL_BOARD);
  const [turn, setTurn] = useState<number>(1);
  const [isBlack, setIsBlack] = useState(`blackPlayer`);
  const [isWhite, setIsWhite] = useState(`whitePlayer`);
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  const [nowColor, setNowColor] = useState<string>(COLOR_SET_KEYS[0]);

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
          <GameEndModal
            blackCell={values.blackCell}
            whiteCell={values.whiteCell}
            winner={values.winner}
            isWhite={isWhite}
            isBlack={isBlack}
            nowColor={nowColor}
          />
        ) : null}
        <button className={styles.hamburgerButton} onClick={() => setIsSidebarOpen(true)}>
          <div className={styles.hamburgerLine} />
          <div className={styles.hamburgerLine} />
          <div className={styles.hamburgerLine} />
        </button>
        {isSideBarOpen ? (
          <SettingSidebar
            handleCloseSidebar={() => setIsSidebarOpen(false)}
            nowColor={nowColor}
            setNowColor={setNowColor}
          />
        ) : null}
        <div
          className={styles.board}
          style={{
            backgroundColor: colorSet[nowColor].background,
            borderColor: colorSet[nowColor].border,
          }}
        >
          {boardView.map((row, y) =>
            row.map((color, x) => (
              <div
                key={`${x}-${y}`}
                className={styles.cell}
                style={{ borderColor: colorSet[nowColor].line }}
              >
                {color === 1 ? (
                  <div
                    className={styles.stone}
                    style={{
                      backgroundColor: colorSet[nowColor].cellBlack,
                      width: '70%',
                      height: '70%',
                    }}
                  />
                ) : color === 2 ? (
                  <div
                    className={styles.stone}
                    style={{
                      backgroundColor: colorSet[nowColor].cellWhite,
                      border: `1px solid ${colorSet[nowColor].whiteCellBorder}`,
                      width: '70%',
                      height: '70%',
                    }}
                  />
                ) : color === 3 ? (
                  <div
                    className={styles.stone}
                    style={{
                      backgroundColor: colorSet[nowColor].cellCanPut,
                      width: '30%',
                      height: '30%',
                    }}
                  />
                ) : null}
              </div>
            )),
          )}
        </div>
        <div className={styles.infomation}>
          <div
            className={styles.showInformation}
            style={{
              backgroundColor: colorSet[nowColor].background,
              borderColor: colorSet[nowColor].border,
              color: colorSet[nowColor].text,
            }}
          >
            <p>
              {turn === 1
                ? `${JSON.stringify(isBlack)}のターン`
                : `${JSON.stringify(isWhite)}のターン`}
            </p>{' '}
            <p>黒：{values.blackCell}枚</p>
            <p>白：{values.whiteCell}枚</p>
          </div>
          <a
            href="/"
            className={styles.return}
            style={{
              backgroundColor: colorSet[nowColor].button,
              borderColor: colorSet[nowColor].border,
              color: colorSet[nowColor].text,
            }}
          >
            メニューに戻る
          </a>
        </div>
      </div>
    </>
  );
};

export default Watch;
