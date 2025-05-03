'use client';

import { useParams } from 'next/navigation';
import styles from '../../index.module.css';

const GameStart = () => {
  const params = useParams();
  const id = params.id as string;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>オセロをプレイする</h1>
      <div className={styles.button}>
        <a href={`/${id}/black`}>黒でプレイする</a>
        <a href={`/${id}/white`}>白でプレイする</a>
      </div>
    </div>
  );
};

export default GameStart;
