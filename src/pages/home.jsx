import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Main from "../components/main/main";
import Preloader from "../components/loader/loader";
import { Modal } from "../components/modal/modal";
import {
  fetchIngredientsData,
  clearIngredientDetails,
} from "../store/ingredients-slice";
import { closeModal } from "../store/modal-slice";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import OrderDetails from "../components/order-details/order-details";

export default function Home() {
  const { isOrderModalOpen, isIngredientModalOpen } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const closeIngredientModal = () => {
    dispatch(closeModal());
    dispatch(clearIngredientDetails());
  };

  const closeOrderModal = () => {
    dispatch(closeModal());
  };



  return (
    <>
      <Main />
      {/* {isIngredientModalOpen && (
        <Modal onClose={closeIngredientModal}>
          <IngredientDetails />
        </Modal>
      )} */}
      {isOrderModalOpen && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
