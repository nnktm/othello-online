'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../create.module.css';
type ApiResponse = { id: string };

const GameCreate = () => {
  const [blackPlayer, setBlackPlayer] = useState(``);
  const [whitePlayer, setWhitePlayer] = useState(``);

  const router = useRouter();

  const handleCreateGame = async () => {
    const response = await fetch('/api/simple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blackPlayer,
        whitePlayer,
      }),
    });
    const data = (await response.json()) as ApiResponse;
    console.log(data);
    void router.push(`/${data.id}/gameStart`);
  };
  return (
    <div>
      <h1 className={styles.title}>新しいゲームを作成</h1>
      <div className={styles.input}>
        <h2>プレイヤー名を入力</h2>
        <p>
          黒のプレイヤー名
          <input type="text" value={blackPlayer} onChange={(e) => setBlackPlayer(e.target.value)} />
        </p>
        <p>
          白のプレイヤー名
          <input type="text" value={whitePlayer} onChange={(e) => setWhitePlayer(e.target.value)} />
        </p>
      </div>
      <button className={styles.button} onClick={handleCreateGame}>
        開始
      </button>
    </div>
  );
};

export default GameCreate;
