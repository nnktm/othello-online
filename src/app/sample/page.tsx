'use client';

import { useState } from 'react';
import styles from '../page.module.css';

const Sample = () => {
  const [board, setBoard] = useState<number[][]>([]);
  const handleClick = async () => {
    const response = await fetch('/api');
    const data = await response.json();
    setBoard(data.board.board.board);
  };
  return (
    <div>
      <button onClick={handleClick}>button</button>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div key={`${x}-${y}`} className={styles.cell}>
              <div
                className={styles.stone}
                style={{
                  backgroundColor:
                    color === 1 ? '#212b33' : color === 2 ? 'white' : color === 3 ? '#d86161' : '',
                  width: color === 3 ? '30%' : '70%',
                  height: color === 3 ? '30%' : '70%',
                }}
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Sample;
