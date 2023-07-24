import React from "react";
import styles from "./modal-accept.module.css";
import image from "../../images/graphics.svg";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/modal-slice";
import Preloader from "../loader/loader";

export default function AcceptModal() {
  const dispatch = useDispatch();

  function onClick() {
    dispatch(closeModal());
  }

  const { order, status, error } = useSelector(
    (state) => state.burgerConstructor
  );

  if (status === "...pending") {
    return (
      <div className={`${styles.popup} pt-30 pb-30`}>
        <CloseIcon type="primary" onClick={onClick} />
        <Preloader />
      </div>
    );
  } else if (status === "rejected") {
    return (
      <div className={`${styles.popup} pt-30 pb-30`}>
        <CloseIcon type="primary" onClick={onClick} />

        <p className="text text_type_main-large mb-15">
          К сожалению все повора заняты.
        </p>
        <p className="text text_type_main-small mt-15">Ошибка:" {error} "</p>
      </div>
    );
  } else {
    return (
      <div className={`${styles.popup} pt-30 pb-30`}>
        <CloseIcon type="primary" onClick={onClick} />
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
