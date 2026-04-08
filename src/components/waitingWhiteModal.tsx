import styles from './styles/gameEndModal.module.css';

type WaitingWhiteModalProps = {
  handleDeleteBoard: () => void;
};

const WaitingWhiteModal = ({ handleDeleteBoard }: WaitingWhiteModalProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h1>プレイヤーを待っています</h1>
        <p>プレイヤーの参加までしばらくお待ち下さい</p>
        <a href="/" className={styles.modalClose} onClick={handleDeleteBoard}>
          ゲームを削除して閉じる
        </a>
      </div>
    </div>
  );
};

export default WaitingWhiteModal;
