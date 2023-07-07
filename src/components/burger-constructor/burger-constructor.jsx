import React from "react";
import PropTypes from 'prop-types'; 
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import AcceptModal from "../modal-accept/modal-accept";

const BurgerElementConstructor = ({ element }) => {

  BurgerElementConstructor.propTypes ={
    element: PropTypes.shape({
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
      __v: PropTypes.number
    })
  }

  if (element.type === "bun") {
    return (
      <ConstructorElement
        text={element.name}
        prise={element.price}
        thumbnail={element.image_mobile}
        type="top"
        isLocked={true}
      />
    );
  } else {
    return (
      <ConstructorElement
        text={element.name}
        prise={element.price}
        thumbnail={element.image_mobile}
      />
    );
  }
};

const BurgerConstructor = ({ data, setIsModalOpen, setChildren }) => {
  const mainElements = data.filter(
    (element) => element.type === "main" || element.type === "sauce"
  );

  BurgerConstructor.propTypes = {
    data: PropTypes.array
  }

  const onClick = () => {
    setIsModalOpen(true);
    setChildren(<AcceptModal />);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
            <BurgerElementConstructor element={item} />
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

export default BurgerConstructor;