import styles from "./overlay.module.css";

export function Overlay({ onClose }) {
  return <div className={styles.overlay} onClick={onClose}></div>;
}
