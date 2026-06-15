import styles from '@/styles/components/activeProcesses/ActiveProcessesHeader.module.scss';

export const ActiveProcessesHeader = () => {
  return (
    <section className={styles["active-processes-header"]}>
  <div className={styles["title"]}>
    <h2>Depo Gösterge Paneli</h2>
    <p>Anlık Lokomotif Bakım ve İkmal Durumu</p>
  </div>

  {/* <div className={styles["stats"]}>
    <div className={styles["stat-box"]}>
      <div className={styles["stat-item"]}>
        <span className={styles["label"]}>Aktif Birim</span>
        <span className={styles["value"]}>12</span>
      </div>

      <div className={styles["divider"]}></div>

      <div className={styles["stat-item"]}>
        <span className={styles["label"]}>Bekleyen</span>
        <span className={styles["value"]} data-type="secondary">05</span>
      </div>
    </div>
  </div> */}
</section>
  )
}
