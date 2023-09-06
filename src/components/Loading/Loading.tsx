import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={`w-screen h-screen flex justify-center items-center`}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}
