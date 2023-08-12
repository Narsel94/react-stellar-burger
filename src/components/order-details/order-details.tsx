import React from "react";
import styles from "./order-details.module.css";
import image from "../../images/graphics.svg";
import Preloader from "../loader/loader";
import { useAppSelector } from "../../utils/hooks";

export default function OrderDetails() {
  const { order, status, error } = useAppSelector(
    (state) => state.burgerConstructor
  );

  if (status === "...pending") {
    return (
      <div className={`${styles.popup} pt-30 pb-30`}>
        <Preloader />
      </div>
    );
  } else if (status === "rejected") {
    return (
      <div className={`${styles.popup} pt-30 pb-30`}>
        <p className="text text_type_main-large mb-15">
          К сожалению все повора заняты.
        </p>
        <p className="text text_type_main-medium mt-15">"{error}"</p>
      </div>
    );
  } else {
    return (
      <div className={`${styles.popup} pt-30 pb-30`}>
        <h1 className="text text_type_digits-large mb-8">{order}</h1>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>

        <img src={image} alt="Done!" className="mb-15" />
        <p className={`${styles.text} text text_type_main-small`}>
          Ваш заказ начали готовить
        </p>
        <p
          className={`${styles.text} ${styles.bottomText} text text_type_main-small text_color_inactive`}
        >
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    );
  }
}
