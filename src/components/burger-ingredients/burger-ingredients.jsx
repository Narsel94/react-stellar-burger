import React from "react";
import styles from "./burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientModal from "../modal-ingredient/modal-ingredient";
import { Modal } from "../modal/modal";

//компонент карточки
const BurgerIngredient = ({ ingredient, setIsModalOpen, setInfo, setChildren }) => {
  //заполняем данными картинки
  const image = <img src={ingredient.image} alt={ingredient.name} />;
  
  

  const onClick = () => {
    setIsModalOpen(true);
    setInfo(ingredient);
    setChildren(<IngredientModal info={ingredient} setIsModalOpen ={setIsModalOpen}/>)
  }

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

function IngredientsList({ type, data, setIsModalOpen, setInfo, setChildren }) {
  const filteredIngedients = data.filter((ingr) => ingr.type === type);
  return (
    <div className={`${styles.ingredientsList} ml-4 mr-4`}>
      {filteredIngedients.map((item) => (
      <BurgerIngredient ingredient={item} key={item._id} setIsModalOpen={setIsModalOpen} setInfo={setInfo} setChildren={setChildren}/>
      ))}
    </div>
  );
}

export default function BurgerIngredients({ data, setIsModalOpen, setInfo, setChildren }) {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.ingredientsSection} mt-10`} id="buns">
        <h2 className="text text_type_main-medium mb-6">Булки</h2>

        <IngredientsList type="bun" data={data} setIsModalOpen={setIsModalOpen} setInfo={setInfo} setChildren={setChildren}/>
      </div>
      <div className={`${styles.ingredientsSection} mt-10`} id="sauces">
        <h2 className="text text_type_main-medium mb-6">Соусы</h2>
        <IngredientsList type="sauce" data={data} setIsModalOpen={setIsModalOpen} setInfo={setInfo}/>
      </div>
      <div className={`${styles.ingredientsSection} mt-10`} id="main">
        <h2 className="text text_type_main-medium mb-6">Начинки</h2>
        <IngredientsList type="main" data={data} setIsModalOpen={setIsModalOpen} setInfo={setInfo}/>
      </div>
    </div>
  );
}
