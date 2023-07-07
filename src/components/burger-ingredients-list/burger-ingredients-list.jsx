import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients-list.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";


export default function IngredientsList({ type, data, setIsModalOpen, setInfo, setChildren }) {
  const filteredIngedients = data.filter((ingr) => ingr.type === type);
  
  IngredientsList.propTypes = {
    type: PropTypes.string, 
    data: PropTypes.array,

  }

  return (
    <div className={`${styles.ingredientsList} ml-4 mr-4`}>
      {filteredIngedients.map((item) => (
        <BurgerIngredient
          ingredient={item}
          key={item._id}
          setIsModalOpen={setIsModalOpen}
          setInfo={setInfo}
          setChildren={setChildren}
        />
      ))}
    </div>
  );
}