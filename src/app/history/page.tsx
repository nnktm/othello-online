'use client';

import { useEffect, useState } from 'react';
import styles from '../../styles/history.module.css';

type BoardResponse = {
  boards: BoardType[];
};
type BoardType = {
  black: string;
  white: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  end: boolean;
  preservation: boolean;
  resultBlack: number;
  resultWhite: number;
  result: string;
};

const HistoryPage = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void handleHistoryFetch();
  }, []);

  const handleHistoryFetch = async () => {
    try {
      const res: Response = await fetch('/api/history');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: BoardResponse = (await res.json()) as BoardResponse;
      if (data.boards) {
        setBoards(data.boards);
        setError(null);
      } else {
        setBoards([]);
        setError('データが見つかりませんでした');
      }
    } catch (err) {
      console.error('Error fetching history:', err);
      setBoards([]);
      setError('データの取得に失敗しました');
    }
  };

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>過去のゲーム一覧</h1>
        <p>エラー: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>過去のゲーム一覧</h1>
      <ul className={styles.body}>
        {boards.map((board) => {
          if (board.end === true && board.preservation === true) {
            return (
              <li key={board.id}>
                <div className={styles.game}>
                  <p>
                    {board.black}:{board.resultBlack}枚{board.white}:{board.resultWhite}枚
                  </p>
                  <p>
                    <strong>
                      {board.resultBlack === board.resultWhite
                        ? '引き分け'
                        : `${board.result}の勝利`}
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
