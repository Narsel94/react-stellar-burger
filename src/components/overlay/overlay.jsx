import styles from "./overlay.module.css";

export function Overlay({ onClick }) {
  return <div className={styles.overlay} onClick={onClick}></div>;
}
