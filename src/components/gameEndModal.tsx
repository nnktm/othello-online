import { colorSet } from '../constants/color';
import styles from './styles/gameEndModal.module.css';

type GameEndModalProps = {
  blackCell: number;
  whiteCell: number;
  winner: string;
  isWhite: string;
  isBlack: string;
  nowColor: string;
};

const GameEndModal = ({
  blackCell,
  whiteCell,
  winner,
  isWhite,
  isBlack,
  nowColor,
}: GameEndModalProps) => {
  return (
    <div className={styles.modalContent} style={{ backgroundColor: colorSet[nowColor].background }}>
      <div className={styles.modalHeader}>
        <h1 style={{ color: colorSet[nowColor].text }}>ゲーム終了</h1>
      </div>
      <p style={{ color: colorSet[nowColor].text }}>
        黒の数{blackCell} 対 白の数{whiteCell}で
      </p>
      <h2 style={{ color: colorSet[nowColor].text }}>
        {winner === isWhite || winner === isBlack
          ? `${JSON.stringify(winner)}の勝ち!!`
          : '引き分け'}
      </h2>
      <a
        href="/"
        className={styles.modalClose}
        style={{ backgroundColor: colorSet[nowColor].button, color: colorSet[nowColor].text }}
      >
        閉じる
      </a>
    </div>
  );
};

export default GameEndModal;
