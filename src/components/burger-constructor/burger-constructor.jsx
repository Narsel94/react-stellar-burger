import React from "react";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import AcceptModal from "../modal-accept/modal-accept";

const BurgerConstructor = ({ data, setIsModalOpen, setChildren }) => {
  const mainElements = React.useMemo((() => data.filter(
    (element) => element.type === "main" || element.type === "sauce"
  )), [data]);

  const onClick = () => {
    setIsModalOpen(true);
    setChildren(<AcceptModal setIsModalOpen={setIsModalOpen} />);
  };

  return (
    <div className={styles.constructor}>
      <div className={`${styles.topLock} pr-6`}>
        <ConstructorElement
          text={data[0].name}
          type="top"
          isLocked={true}
          prise={data[0].price}
          thumbnail={data[0].image_mobile}
        ></ConstructorElement>
      </div>
      <div className={styles.mainElement}>
        {mainElements.map((item) => (
          <div className={`${styles.mainItem} pr-4 pl-4`} key={item._id}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              prise={item.price}
              thumbnail={item.image_mobile}
            />
          </div>
        ))}
      </div>
      <div className={`${styles.bottonLock} mr-6`}>
        <ConstructorElement
          text={data[0].name}
          type="bottom"
          isLocked={true}
          prise={data[0].price}
          thumbnail={data[0].image_mobile}
          extraClass={styles.element}
        />
      </div>
      <div>
        <div className={`${styles.bill} mr-4`} key="bill">
          <CurrencyIcon type="primary" />
          <p className="text text_type_main-large">610</p>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={onClick}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  })).isRequired,
  setIsModalOpen: PropTypes.func,
  setInfo: PropTypes.func,
  setChildren: PropTypes.func,
};

export default BurgerConstructor;
