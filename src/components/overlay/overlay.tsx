import styles from "./overlay.module.css";
import { FC } from "react";
import { TOverlayProps } from "../../utils/types";

const Overlay:FC<TOverlayProps> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
}

export default Overlay