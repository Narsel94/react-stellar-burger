import React, { FC, JSXElementConstructor } from "react";
import { useAppSelector } from "../../../utils/hooks";
import styles from "./feed-ingredient.module.css";
import { TFeedIngredient } from "../../../utils/types";
//
const FeedIngredient: FC<TFeedIngredient> = ({ id, index, length }) => {
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const info = ingredients.find((item) => item._id === id);

  const style = {
    zIndex: index,
  };

  if (info) {
    return (
      info && (
        <li style={style} className={styles.wrapper}>
          <img
            className={styles.image}
            src={info.image_mobile}
            alt={info.name}
          />
          {length > 7 && index === 0 && (
            <p className={`${styles.counter} text text_type_digits-default`}>
              +{length - 7}
            </p>
          )}
        </li>
      )
    );
  }
  return null
};

export default FeedIngredient;
