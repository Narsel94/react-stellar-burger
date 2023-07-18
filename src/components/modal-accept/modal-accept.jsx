import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-accept.module.css";
import image from "../../images/graphics.svg";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import {closeModal} from '../store/modal-slice'


export default function AcceptModal() {
  const dispatch = useDispatch();

  function onClick() {
    dispatch(closeModal())
  }

  return (
    <div className={`${styles.popup} pt-30 pb-30`}>
      <CloseIcon type="primary" onClick={onClick} />
      <h1 className="text text_type_digits-large mb-8">034536</h1>
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


