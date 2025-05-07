'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../create.module.css';
type ApiResponse = { id: string };

const GameCreate = () => {
  const [blackPlayer, setBlackPlayer] = useState(``);

  const router = useRouter();

  const handleCreateGame = async () => {
    const response = await fetch('/api/simple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blackPlayer,
      }),
    });
    const data = (await response.json()) as ApiResponse;
    console.log(data);
    void router.push(`/${data.id}/black`);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>新しいゲームを作成</h1>
      <div className={styles.input}>
        <h2>プレイヤー名を入力</h2>
        <p>
          プレイヤー名
          <input
            type="text"
            value={blackPlayer}
            onChange={(e) => setBlackPlayer(e.target.value)}
            className={styles.textBox}
          />
        </p>
      </div>
      <button className={styles.button} onClick={handleCreateGame}>
        開始
      </button>
    </div>
  );
};

export default GameCreate;
