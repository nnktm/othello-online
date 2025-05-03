import styles from './index.module.css';
const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>オセロをプレイする！！！！！</h1>
      <div className={styles.button}>
        <a href="/black">黒でプレイする</a>
        <a href="/white">白でプレイする</a>
      </div>
    </div>
  );
};

export default Home;
