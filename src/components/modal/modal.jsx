import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientModal from "../modal-ingredient/modal-ingredient";
import AcceptModal from "../modal-accept/modal-accept";


export const modalRoot = document.getElementById("react-modal");

export function Modal({ setIsModalOpen, info, setAccept, isAccept, children }) {
  
  // const [isAccept, setAccept] = React.useState(false);
  
  const onClick = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    function onEsc(evt) {
      if (evt.code === "Escape") {
        setIsModalOpen(false);
      }
    }
    document.addEventListener("keydown", onEsc);

    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={onClick}>
      {children}
    </div>,
    modalRoot
  )

}
