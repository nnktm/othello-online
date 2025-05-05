'use client';
import { useRouter } from 'next/navigation';
import styles from '../create.module.css';
type ApiResponse = { id: string };

const GameCreate = () => {
  const router = useRouter();
  const handleCreateGame = async () => {
    const response = await fetch('/api/simple', { method: 'POST' });
    const data = (await response.json()) as ApiResponse;
    console.log(data);
    void router.push(`/${data.id}/gameStart`);
  };
  return (
    <div>
      <h1 className={styles.title}>新しいゲームを作成</h1>
      <button className={styles.button} onClick={handleCreateGame}>
        開始
      </button>
    </div>
  );
};

export default GameCreate;
