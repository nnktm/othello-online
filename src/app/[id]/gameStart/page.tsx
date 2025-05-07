'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../start.module.css';

const GameStart = () => {
  const [whitePlayer, setWhitePlayer] = useState(``);
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  type ApiResponse = { id: string };

  const handleOnClick = async () => {
    const response = await fetch(`/api/gameStart?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, whitePlayer }),
    });
    const data = (await response.json()) as ApiResponse;
    console.log(data);
    void router.push(`/${data.id}/white`);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>オセロをプレイする</h1>
      <div className={styles.input}>
        <p>名前を入力してください</p>
        <p>
          <input
            type="text"
            value={whitePlayer}
            onChange={(e) => setWhitePlayer(e.target.value)}
            className={styles.textBox}
          />
        </p>
      </div>
      <button className={styles.button} onClick={handleOnClick}>
        ゲームに参加する
      </button>
    </div>
  );
};

export default GameStart;
