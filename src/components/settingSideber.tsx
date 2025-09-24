import { COLOR_SET_KEYS, colorSet } from '../constants/color';
import styles from './styles/settingSidebar.module.css';

type settingSidebarProps = {
  handleCloseSidebar: () => void;
  setNowColor: (color: string) => void;
  nowColor: string;
};

const settingSidebar = ({ handleCloseSidebar, nowColor, setNowColor }: settingSidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <h2>Sidebar</h2>
      <div className={styles.colorSetContainer}>
        <button
          onClick={handleCloseSidebar}
          style={{ backgroundColor: colorSet[nowColor].button, color: colorSet[nowColor].text }}
        >
          Close
        </button>
        {COLOR_SET_KEYS.map((color) => (
          <button
            key={color}
            onClick={() => setNowColor(color)}
            className={`${styles.colorSetButton} ${color === nowColor ? styles.selected : ''}`}
          >
            <div
              className={styles.colorSetItem}
              style={{ backgroundColor: colorSet[color].cellBlack }}
            />
            <div
              className={styles.colorSetItem}
              style={{ backgroundColor: colorSet[color].cellWhite }}
            />
            <span className={styles.colorSetName}>{color}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default settingSidebar;
