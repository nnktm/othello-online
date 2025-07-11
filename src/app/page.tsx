import styles from '../styles/index.module.css';
const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>オセロをプレイする！！！！！</h1>
      <div className={styles.button}>
        <a href="/gameCreate">新しくゲームを作成してプレイする</a>
        <a href="/gameRecruitment">現在相手募集中のゲームを探す</a>
        <a href="/watch">観戦可能なゲームを探す</a>
        <a href="/history">過去の対戦結果を見る</a>
      </div>
    </div>
  );
};

export default Home;
