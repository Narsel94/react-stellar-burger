import React, { CSSProperties, useState, useMemo } from "react";
import styles from "./feed-details.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient, TOrder } from "../../utils/types";
import { getCountOfdublicates } from "../../utils/functions";
import FeedIngredientDetails from "./feed-ingredients-details/feed-ingredients-details";

const FeedDetails = () => {
  const orders = useAppSelector((state) => state.websocket.orders);
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const location = useLocation();

  const initialOrder:TOrder = {
    _id: '',
    ingredients:[],
    status: '',
    name: 'Заказ не найден',
    createdAt: new Date().toDateString(),
    updatedAt:'',
    number: 404,
  }

  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState(initialOrder);

  const numberStyle: CSSProperties = {
    display: "block",
    textAlign: "center",
  };

  let { id } = useParams();

  useMemo(() => {
    if (orders.length !== 0 && ingredients.length !== 0) {
      const order = orders.find((item) => item._id === id);
      if (order) {
        setOrder(order)
        const allIngreients = order.ingredients.map((id) => {
          return ingredients.find((item) => item._id === id);
        });
        const totalPrice = allIngreients?.reduce((previous, current) => previous + (current ? current.price : 0 ), 0);
        setTotal(totalPrice)
      }
    }
  }, [id, orders, ingredients]);


  const date = new Date(order.createdAt);
  const igredientsObjOfIdCount = getCountOfdublicates(order.ingredients);
  const ingredientId = Object.keys(igredientsObjOfIdCount);
  return (
    <div className={styles.feed}>
      <div>
        <span
          className={`text text_type_digits-default`}
          style={!location.state ? numberStyle : undefined}
        >
          # {order.number}
        </span>
        <h1 className={`${styles.title} text text_type_main-large mb-4`}>
          {order.name}
        </h1>
        {order.status === "created" && (
          <p className={`text text_type_main-medium`}>Готовиться</p>
        )}
        {order.status === "done" && (
          <p className={`${styles.done} text text_type_main-medium`}>
            Выполнен
          </p>
        )}
        {order.status !== "created" && order.status !== "done" && (
          <p className={`${styles.cancel} text text_type_main-medium`}>
            Отменен
          </p>
        )}

        <div className={`${styles.detailInfo} mt-6`}>
          <p className="text text_type_main-medium mb-4">Coстав:</p>
          <div className={styles.ingredientsBlock}>
            {ingredientId.map((id) => (
              <FeedIngredientDetails
                id={id}
                key={id}
                count={igredientsObjOfIdCount[id]}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <p className="text text_type_main-medium text_color_inactive">
          <FormattedDate date={date} />
        </p>
        <div className={styles.priceBlock}>
          <CurrencyIcon type="primary" />
          <p className="text text_type_digits-medium">{total}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedDetails;
