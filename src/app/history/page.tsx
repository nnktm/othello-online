'use client';

import { useEffect, useState } from 'react';
import styles from '../history.module.css';

type BoardResponse = {
  boards: BoardType[];
};
type BoardType = {
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
    const data: BoardResponse = await res.json();
    setBoards(data.boards);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>過去のゲーム一覧</h1>
      <ul className={styles.body}>
        {boards.map((board) => (
          <li key={board.id}>
            <div className={styles.game}>
              <p>
                <strong>ID:</strong> <a href={`${board.id}/gameStart`}>{board.id}</a>
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
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
