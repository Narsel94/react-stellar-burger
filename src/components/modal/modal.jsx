import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { Overlay } from "../overlay/overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const modalRoot = document.getElementById("react-modal");

export function Modal({ children, onClose }) {
  React.useEffect(() => {
    function onEsc(evt) {
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
        <CloseIcon type="primary" onClick={onClose} />
      </div>
      <Overlay onClose={onClose} />
    </>,
    modalRoot
  );
}
