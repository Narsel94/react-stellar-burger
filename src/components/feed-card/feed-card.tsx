import React, { useMemo, FC, useCallback, useState } from "react";
import styles from "./feed-card.module.css";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import FeedIngredient from "./feed-ingredient/feed-ingredient";
import { useAppSelector } from "../../utils/hooks";
import { v4 as uuidv4 } from "uuid";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TFeedCard, TIngredient } from "../../utils/types";

const FeedCard: FC<TFeedCard> = ({ order }) => {

   const [total, setTotal] = useState(0) 
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);

  // const ingredientArr = order.ingredients.map((id) => {
  //   return ingredients.find((item) => item._id === id);
  // });

  useMemo(() => {
    if (ingredients.length !== 0) {
      const testArr = order.ingredients.map((id) => {
        return ingredients.find((item) => item._id === id);
      });
      const totalPrice = testArr?.reduce((previous, current) => previous + current?.price!, 0);
      setTotal(totalPrice)
    }
  }, [total]);


  const date = new Date(order.createdAt);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={`${styles.orderData} text text_type_main-default`}>
          # {order.number}
        </p>
        <p
          className={`${styles.orderData} text text_type_main-default text_color_inactive`}
        >
          <FormattedDate date={date} />
        </p>
      </div>

      <h3 className={`${styles.title} text text_type_main-medium`}>
        {order.name}
      </h3>
      <div className={styles.infoBlock}>
        <ul className={styles.ingredientsList}>
          {order.ingredients
            .slice(-7)
            .map((id, index) => (
              <FeedIngredient
                id={id}
                index={index}
                length={order.ingredients.length}
                key={uuidv4()}
              />
            ))
            .reverse()}
          {order.ingredients.length > 7 && (
            <p className={`${styles.ellipsis} text text_type_main-medium`}>
              ...
            </p>
          )}
        </ul>
        <div className={styles.priceBlock}>
          <CurrencyIcon type="primary" />
          <p className="text text_type_digits-default">{total}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
