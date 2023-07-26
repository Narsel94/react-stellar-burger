import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import Preloader from "../loader/loader";
import { Modal } from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIngredientsData,
  clearIngredientDetails,
} from "../../store/ingredients-slice";
import { closeModal } from "../../store/modal-slice";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

function App() {
  const { isOrderModalOpen, isIngredientModalOpen } = useSelector(
    (state) => state.modal
  );
  const { status, error } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  const closeIngredientModal = () => {
    dispatch(closeModal());
    dispatch(clearIngredientDetails());
  };

  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    dispatch(fetchIngredientsData());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className={styles.container}>
        <Preloader />
      </div>
    );
  } else if (status === "rejected") {
    return (
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">
          Что-то пошло не так, error:{error}{" "}
        </h1>
      </div>
    );
  } else {
    return (
      <div className={styles.app}>
        <AppHeader />
        <Main />
        {/* {(isModalOpen) && <Modal />} */}
        {isIngredientModalOpen && (
          <Modal onClick={closeIngredientModal}>
            <IngredientDetails />
          </Modal>
        )}
        {isOrderModalOpen && (
          <Modal onClick={closeOrderModal}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
