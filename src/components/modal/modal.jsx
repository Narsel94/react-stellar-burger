import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { Overlay } from "../overlay/overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const modalRoot = document.getElementById("react-modal");

export function Modal({ children, onClick }) {
  React.useEffect(() => {
    function onEsc(evt) {
      if (evt.code === "Escape") {
        onClick();
      }
    }
    document.addEventListener("keydown", onEsc);

    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        {children}
        <CloseIcon type="primary" onClick={onClick} />
      </div>
      <Overlay onClick={onClick} />
    </>,
    modalRoot
  );
}
