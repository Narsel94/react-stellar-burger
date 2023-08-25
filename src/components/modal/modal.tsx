import React, { useState, FC } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import  Overlay  from "../overlay/overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TModalProps } from "../../utils/types";


 const Modal:FC<TModalProps> = ({ children, onClose }) => {

 const modalRoot: HTMLElement = document.getElementById("react-modal") as HTMLElement;
   
  React.useEffect(() => {
    function onEsc(evt:KeyboardEvent) {
      if (evt.code === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", onEsc);

    return () => document.removeEventListener("keydown", onEsc);
  }, []);
 
    
  
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        {children}
        <span className={styles.icon}>
          <CloseIcon type="primary" onClick={onClose} />
        </span>
        
      </div>
      <Overlay onClose={onClose} />
    </>,
    modalRoot
  );
}

export default Modal
