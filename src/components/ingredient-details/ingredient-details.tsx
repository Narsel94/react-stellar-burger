import React, { FC, useEffect } from "react";
import styles from "./igredient-details.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { TIngredient } from "../../utils/types";
import { useLocation } from "react-router-dom";

const IngredientDetails = () => {
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);

  const location = useLocation();

  const titleStyle = {
    margin: "0 auto",
  };

  let { id } = useParams();
  if (ingredients.length === 0) return null;

  //
  const info = ingredients.find((item) => item._id === id) as TIngredient;

  return (
    <div className={`${styles.popup} pt-10 pr-10 pl-10 pb-15`}>
      <div className={styles.header}>
        <h2
          className={`${styles.title} text text_type_main-large`}
          style={!location.state ? titleStyle : undefined}
        >
          Детали ингредиента
        </h2>
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
};

export default IngredientDetails;
