import React, { useMemo, FC, useCallback, useState, useEffect } from "react";
import styles from "./feed-card.module.css";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import FeedIngredient from "./feed-ingredient/feed-ingredient";
import { useAppSelector } from "../../utils/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TFeedCard, TOrder } from "../../utils/types";
import { useLocation } from "react-router-dom";

const FeedCard: FC<TFeedCard> = ({ order }) => {
  const initialOrderData: TOrder = {
    _id: "",
    ingredients: [],
    status: "",
    name: "Заказ не найден",
    createdAt: new Date().toDateString(),
    updatedAt: "",
    number: 404,
  };
  const [orderData, setOrderData] = useState(initialOrderData);
  const [total, setTotal] = useState(0);
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);

  const location = useLocation();

  useEffect(() => {
    setOrderData(order);
  }, [order]);

  function checkStatusForProfile(pathname : string , orderData: TOrder  ) {
    if (pathname === '/profile/orders') {
      if (orderData.status === "created") {
        return ( <p className={`text text_type_main-default`}>Готовиться</p>)
      }
      if (orderData.status === "done") {return ( <p className={`${styles.compleateStatus} text text_type_main-default`}>Выполнен</p>)}
      return ( <p className={`${styles.rejectStatus} text text_type_main-default`}>Отменен</p>)
    }
    return null
  }

  useMemo(() => {
    if (ingredients.length !== 0 && order) {
      const ingrArr = order.ingredients.map((id) => {
        return ingredients.find((item) => item._id === id);
      });
      const totalPrice = ingrArr?.reduce(
        (previous, current) => previous + (current ? current.price : 0),
        0
      );
      setTotal(totalPrice);
    }
  }, [order]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={`${styles.orderData} text text_type_main-default`}>
          # {order.number}
        </p>
       
        <FormattedDate
          date={new Date(orderData.createdAt)}
          className={`${styles.orderData} text text_type_main-default text_color_inactive`}
        />
      </div>
        {checkStatusForProfile(location.pathname, orderData)}
      <h3 className={`${styles.title} text text_type_main-medium`}>
        {order.name}
      </h3>
      <div className={styles.infoBlock}>
        <ul className={styles.ingredientsList}>
          {orderData.ingredients
            .slice(-7)
            .map((id, index) => (
              <FeedIngredient
                id={id}
                index={index}
                length={orderData.ingredients.length}
                key={`${id}${index}`}
              />
            ))
            .reverse()}
          {orderData.ingredients.length > 7 && (
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
