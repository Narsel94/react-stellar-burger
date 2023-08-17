import React, {FC} from "react";
import { useAppSelector } from "../../../utils/hooks";
import styles from "./feed-ingredients-details.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TFeedIngredientsDetails } from "../../../utils/types";


const FeedIngredientDetails:FC<TFeedIngredientsDetails> = ({ id, count }) => {
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const info = ingredients.find((item) => item._id === id);

  if (info) {
    return ( 
      <div className={styles.block}>
        <div className={styles.prevui}>
          <img className={styles.image} src={info.image_mobile} alt={info.name} />
        <span className={`${styles.title} ml-6 text text_type_main-default`}>{info.name}</span> 
        </div>

        <div className={styles.total}>
        <p className="text text_type_digits-default">{count} X</p>
        <p className="text text_type_digits-default ml-2 mr-4">{info.price}</p>
        <CurrencyIcon type="primary"/>
        </div>

      </div>
    )
  }

  return null
};

export default FeedIngredientDetails;
