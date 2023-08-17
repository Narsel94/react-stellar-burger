import React, { useMemo } from "react";
import styles from "./feed-details.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient, TOrder } from "../../utils/types";
import { InitialData } from "../../utils/constants";
import { getCountOfdublicates } from "../../utils/functions";

import FeedIngredientDetails from "./feed-ingredients-details/feed-ingredients-details";

function FeedDetails() {
  let { id } = useParams();
  const orders = InitialData.orders;
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
    const order = orders.find((item) => item._id === id) as TOrder;
  const allIngreients = order.ingredients.map((id) => {
    return ingredients.find((item) => item._id === id);
  }) as TIngredient[];
  const totalPrice = useMemo(() => {
    if (allIngreients) {
      return allIngreients.reduce(
        (sum, element) =>
          sum + element.price * (element.type === "bun" ? 2 : 1),
        0
      );
    }
    return 0;
  }, [allIngreients]);

  const location = useLocation();

  if (orders.length === 0) return null;
  
  if (id) {
    const date = new Date(order!.createdAt);
    const igredientsObjOfIdCount = getCountOfdublicates(order.ingredients);
    const ingredientId = Object.keys(igredientsObjOfIdCount);
    return (
      <div className={styles.feed}>
        <div>
          <span className="text text_type_digits-default">
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
            <p className="text text_type_digits-medium"> {totalPrice}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default FeedDetails;
