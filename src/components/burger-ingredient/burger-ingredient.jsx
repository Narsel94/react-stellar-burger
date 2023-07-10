import React from "react";
import PropTypes from "prop-types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientModal from "../modal-ingredient/modal-ingredient";
import styles from "./burger-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = ({
  ingredient,
  setIsModalOpen,
  setInfo,
  setChildren,
}) => {
  //заполняем данными картинки
  const image = <img src={ingredient.image} alt={ingredient.name} />;

  const onClick = () => {
    setIsModalOpen(true);
    setInfo(ingredient);
    setChildren(
      <IngredientModal info={ingredient} setIsModalOpen={setIsModalOpen} />
    );
  };

  return (
    <div
      className={`${styles.card} text text_type_main-default pl-4 pr-4`}
      key={ingredient.id}
      onClick={onClick}
    >
      <Counter count={1} size="default" extraClass={`${styles.counter} m-1`} />
      <div className={styles.image}>{image}</div>
      <div className={`${styles.priceBlock} mt-1 mb-1`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.text} text text_type_main-small`}>
        {ingredient.name}
      </p>
    </div>
  );
};

BurgerIngredient.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }).isRequired,
  setIsModalOpen: PropTypes.func,
  setInfo: PropTypes.func,
  setChildren: PropTypes.func,
};

export default BurgerIngredient;
