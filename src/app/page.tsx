import styles from './index.module.css';
const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>オセロをプレイする！！！！！</h1>
      <div className={styles.button}>
        <a href="/history">過去に作成したゲーム一覧を見る</a>
        <a href="/gameCreate">新しくゲームを作成してプレイする</a>
      </div>
    </div>
  );
};

export default Home;
