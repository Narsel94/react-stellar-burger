import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import IngredientsList from "../burger-ingredients-list/burger-ingredients-list";

export default function BurgerIngredients({
  data,
  setIsModalOpen,
  setInfo,
  setChildren,
}) {

  BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    setIsModalOpen: PropTypes.func, 
    setInfo: PropTypes.func, 
    setChildren: PropTypes.func, 
  }
  
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.ingredientsSection} mt-10`} id="buns">
        <h2 className="text text_type_main-medium mb-6">Булки</h2>

        <IngredientsList
          type="bun"
          data={data}
          setIsModalOpen={setIsModalOpen}
          setInfo={setInfo}
          setChildren={setChildren}
        />
      </div>
      <div className={`${styles.ingredientsSection} mt-10`} id="sauces">
        <h2 className="text text_type_main-medium mb-6">Соусы</h2>
        <IngredientsList
          type="sauce"
          data={data}
          setIsModalOpen={setIsModalOpen}
          setInfo={setInfo}
          setChildren={setChildren}

        />
      </div>
      <div className={`${styles.ingredientsSection} mt-10`} id="main">
        <h2 className="text text_type_main-medium mb-6">Начинки</h2>
        <IngredientsList
          type="main"
          data={data}
          setIsModalOpen={setIsModalOpen}
          setInfo={setInfo}
          setChildren={setChildren}

        />
      </div>
    </div>
  );
}
