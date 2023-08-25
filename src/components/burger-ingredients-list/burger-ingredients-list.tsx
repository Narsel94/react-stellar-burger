import React, { FC } from "react";
import styles from "./burger-ingredients-list.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { TIngredientsListProps } from "../../utils/types";

const IngredientsList: FC<TIngredientsListProps> = ({
  type,
  data,
  innerRef,
  name,
}) => {
  const filteredIngedients = React.useMemo(
    () => data.filter((ingr) => ingr.type === type),
    [data]
  );

  const getTitle = () => {
    if (name === "buns") {
      return "Булки";
    } else if (name === "sauces") {
      return "Соусы";
    } else if (name === "main") {
      return "Начинки";
    } else {
      return "Секция";
    }
  };

  return (
    <div className={styles.section} id={name}>
      <h2 className="text text_type_main-medium mb-6 mt-4">{getTitle()}</h2>
      <div
        ref={innerRef}
        className={`${styles.ingredientsList} list ml-4 mr-4`}
      >
        {filteredIngedients.map((item) => (
          <BurgerIngredient key={item._id} ingredient={item} />
        ))}
      </div>
    </div>
  );
};

export default IngredientsList;
