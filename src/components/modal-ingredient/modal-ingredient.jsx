import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-ingredient.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store/modal-slice";
import { clearIngredientDetails } from "../store/ingredients-slice";




export default function IngredientModal() {
  const dispatch = useDispatch();
  const info = useSelector(state => state.ingredients.currentIngredient);

  function onClick() {
    dispatch(closeModal());
    dispatch(clearIngredientDetails())
  }


  return (
    <div className={`${styles.popup} pt-10 pr-10 pl-10 pb-15`}>
      <div className={styles.header}>
        <h2 className={`${styles.title} text text_type_main-large`}>
          Детали ингредиента
        </h2>
        <CloseIcon type="primary" onClick={onClick} />
      </div>
      <div className={`${styles.image}`}>
        <img src={info.image_large} alt={info.name} />
      </div>
      <h3 className="mb-8 text text_type_main-medium mt-4">{info.name}</h3>
      <div className={styles.details}>
        <div className={styles.kbju}>
          <p className="text text_type_main-small text_color_inactive">
            Каллорий, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {info.calories}
          </p>
        </div>
        <div className={styles.kbju}>
          <p className="text text_type_main-small text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {info.proteins}
          </p>
        </div>
        <div className={styles.kbju}>
          <p className="text text_type_main-small text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {info.fat}
          </p>
        </div>
        <div className={styles.kbju}>
          <p className="text text_type_main-small text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {info.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

