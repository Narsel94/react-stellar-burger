import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { Overlay } from "../overlay/overlay";

export const modalRoot = document.getElementById("react-modal");

export function Modal({ setIsModalOpen, children }) {
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

  return ReactDOM.createPortal((
    <>
    <div className={styles.modal}>{children}</div>
    <Overlay setIsModalOpen={setIsModalOpen}/>
    </>
    ),
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  setIsModalOpen: PropTypes.func,
};
