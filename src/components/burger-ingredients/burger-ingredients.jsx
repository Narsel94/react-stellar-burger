import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import IngredientsList from "../burger-ingredients-list/burger-ingredients-list";
import { useSelector } from "react-redux";


export default function BurgerIngredients() {
  
  const ingredients = useSelector(state => state.ingredients.ingredients);
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.ingredientsSection} mt-10`} id="buns">
        <h2 className="text text_type_main-medium mb-6">Булки</h2>

        <IngredientsList
          type="bun"
          data={ingredients}

        />
      </div>
      <div className={`${styles.ingredientsSection} mt-10`} id="sauces">
        <h2 className="text text_type_main-medium mb-6">Соусы</h2>
        <IngredientsList
          type="sauce"
          data={ingredients}

        />
      </div>
      <div className={`${styles.ingredientsSection} mt-10`} id="main">
        <h2 className="text text_type_main-medium mb-6">Начинки</h2>
        <IngredientsList
          type="main"
          data={ingredients}
   
        />
      </div>
    </div>
  );
}

// BurgerIngredients.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape({
//     _id: PropTypes.string,
//     name: PropTypes.string,
//     type: PropTypes.string,
//     proteins: PropTypes.number,
//     fat: PropTypes.number,
//     carbohydrates: PropTypes.number,
//     calories: PropTypes.number,
//     price: PropTypes.number,
//     image: PropTypes.string,
//     image_mobile: PropTypes.string,
//     image_large: PropTypes.string,
//     __v: PropTypes.number,
//   })).isRequired,
//   setIsModalOpen: PropTypes.func,
//   setInfo: PropTypes.func,
//   setChildren: PropTypes.func,
// };
