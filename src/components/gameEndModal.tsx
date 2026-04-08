import styles from './styles/gameEndModal.module.css';

type GameEndModalProps = {
  blackCell: number;
  whiteCell: number;
  winner: string;
  isWhite: string;
  isBlack: string;
};

const GameEndModal = ({ blackCell, whiteCell, winner, isWhite, isBlack }: GameEndModalProps) => {
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h1>ゲーム終了</h1>
      </div>
      <p>
        黒の数{blackCell} 対 白の数{whiteCell}で
      </p>
      <h2>
        {winner === isWhite || winner === isBlack
          ? `${JSON.stringify(winner)}の勝ち!!`
          : '引き分け'}
      </h2>
      <a href="/" className={styles.modalClose}>
        閉じる
      </a>
    </div>
  );
};

export default GameEndModal;
