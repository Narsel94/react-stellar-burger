import React from "react";
import ReactDOM from "react-dom";
import styles from "./overlay.module.css";
import { closeModal } from "../../services/actions/modal";
import { useDispatch } from "react-redux";


const modalRoot = document.getElementById("react-modal");

export function Overlay() {

  const dispatch = useDispatch();


const onClick = () => {
  dispatch(closeModal())
}




return ReactDOM.createPortal(
  ( 
    <div className={styles.overlay} onClick={onClick}>
    </div>
   ), modalRoot
  );
}
