import { colorSet } from '../constants/color';
import styles from './styles/gameEndModal.module.css';

type WaitingWhiteModalProps = {
  handleDeleteBoard: () => void;
  nowColor: string;
};

const WaitingWhiteModal = ({ handleDeleteBoard, nowColor }: WaitingWhiteModalProps) => {
  return (
    <div className={styles.modal}>
      <div
        className={styles.modalContent}
        style={{ backgroundColor: colorSet[nowColor].background }}
      >
        <h1 style={{ color: colorSet[nowColor].text }}>プレイヤーを待っています</h1>
        <p style={{ color: colorSet[nowColor].text }}>プレイヤーの参加までしばらくお待ち下さい</p>
        <a
          href="/"
          className={styles.modalClose}
          onClick={handleDeleteBoard}
          style={{ backgroundColor: colorSet[nowColor].button, color: colorSet[nowColor].text }}
        >
          ゲームを削除して閉じる
        </a>
      </div>
    </div>
  );
};

export default WaitingWhiteModal;
