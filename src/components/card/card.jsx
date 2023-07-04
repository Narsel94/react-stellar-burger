import React from "react";
import styles from "./card.module.css";
import { data } from "../../utils/data";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

//компонент карточки
const BurgerIngredient = ({ ingredient }) => {
  //заполняем данными картинки
  const image = <img src={ingredient.image} alt={ingredient.name} />;
  return (
    <div
      className={`${styles.card} text text_type_main-default pl-4 pr-4`}
      key={ingredient.id}
    >
      <div className={styles.image}>{image}</div>
      <div className={`${styles.priceBlock} mt-1 mb-1`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.text} text text_type_main-default`}>
        {ingredient.name}
      </p>
    </div>
  );
};

export default function IngredientsList({type}) {
  const filteredIngedients = data.filter(ingr => ingr.type === type);
  function checkTitle() {
    if (type === 'main') {
      return 'Начинки'
    } else if (type === 'bun') {
      return 'Булки'
    } else if (type === 'sauce') {
      return 'Соусы'
    }
  }
  return (
    <div className="mt-10">
      <h2 className="text text_type_main-medium mb-6">{
        checkTitle()
      }</h2>
      <div className={`${styles.ingredientsList} ml-4 mr-4`}>
        {filteredIngedients.map((item) => (
          <BurgerIngredient ingredient={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}
