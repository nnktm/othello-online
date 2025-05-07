'use client';

import { useEffect, useState } from 'react';
import styles from '../history.module.css';

type BoardResponse = {
  boards: BoardType[];
};
type BoardType = {
  black: string;
  white: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

const HistoryPage = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);
  useEffect(() => {
    void handleHistoryFetch();
  }, []);
  const handleHistoryFetch = async () => {
    const res: Response = await fetch('/api/history');
    const data: BoardResponse = (await res.json()) as BoardResponse;
    setBoards(data.boards);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>対戦相手募集中のゲーム一覧</h1>
      <ul className={styles.body}>
        {boards.map((board) => {
          if (board.white === '') {
            return (
              <li key={board.id}>
                <div className={styles.game}>
                  <p>
                    <strong>
                      <a href={`/${board.id}/gameStart`} className={styles.link}>
                        {board.black}（募集中）
                      </a>
                    </strong>
                  </p>
                  <div className={styles.time}>
                    <p>
                      <strong>作成日時:</strong> {new Date(board.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>最終更新日時:</strong> {new Date(board.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default HistoryPage;
