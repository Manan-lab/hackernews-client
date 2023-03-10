import styles from './newsLoader.module.css';

function NewsLoader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default NewsLoader;
