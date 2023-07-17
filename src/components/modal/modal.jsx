import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { Overlay } from "../overlay/overlay";
import { useSelector } from "react-redux";
import AcceptModal from "../modal-accept/modal-accept";
import IngredientModal from "../modal-ingredient/modal-ingredient";
import { closeModal } from "../../services/actions/modal";
import { useDispatch } from "react-redux";

export const modalRoot = document.getElementById("react-modal");

export function Modal() {
  const dispatch = useDispatch();

  const isOrderModalOpen = useSelector((state) => state.modal.isOrderModalOpen);
  const isIngredientModalOpen = useSelector(
    (state) => state.modal.isIngredientModalOpen
  );

  React.useEffect(() => {
    function onEsc(evt) {
      if (evt.code === "Escape") {
        dispatch(closeModal());
      }
    }
    document.addEventListener("keydown", onEsc);

    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  function toggleModalContent() {
    if (isOrderModalOpen) {
      return <AcceptModal />;
    } else if (isIngredientModalOpen) {
      return <IngredientModal />;
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>{toggleModalContent()}</div>
      <Overlay />
    </>,
    modalRoot
  );
}
