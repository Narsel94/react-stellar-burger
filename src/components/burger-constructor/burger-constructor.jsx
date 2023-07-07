import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import AcceptModal from "../modal-accept/modal-accept";

const BurgerElementConstructor = ({ element }) => {
  if (element.type === "bun") {
    return (
      <ConstructorElement
        text={element.name}
        prise={element.price}
        thumbnail={element.image_mobile}
        type="top"
        isLocked={true}
        key={element._id}
      />
    );
  } else {
    return (
      <ConstructorElement
        text={element.name}
        prise={element.price}
        thumbnail={element.image_mobile}
        key={element._id}
      />
    );
  }
};

const BurgerConstructor = ({ data, setIsModalOpen, setChildren }) => {
  const bunsElements = data.filter((element) => element.type === "bun");
  const mainElements = data.filter(
    (element) => element.type === "main" || element.type === "sauce"
  );

  const onClick = () => {
    setIsModalOpen(true);
    setChildren(<AcceptModal />)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className={`${styles.topLock} pr-6`} key="topBun">
        {/* {bunsElements.map((item) => (
          <BurgerElementConstructor element={item}/>
        ))} */}
        <ConstructorElement
          text={data[0].name}
          type="top"
          isLocked={true}
          prise={data[0].price}
          thumbnail={data[0].image_mobile}
          key={data[0]._id}
        ></ConstructorElement>
      </div>
      <div className={styles.mainElement} key="main">
        {mainElements.map((item) => (
          <div className={`${styles.mainItem} pr-4 pl-4`}>
            <DragIcon type="primary" />
            <BurgerElementConstructor element={item} key={item._id}/>
          </div>
        ))}
      </div>
      <div className={`${styles.bottonLock} mr-6`} key="bottomBun">
        <ConstructorElement
          text={data[0].name}
          type="bottom"
          isLocked={true}
          prise={data[0].price}
          thumbnail={data[0].image_mobile}
          extraClass={styles.element}
          key={data[0]._id}
        />
      </div>
      <div>
        <div className={`${styles.bill} mr-4`} key="bill">
          <CurrencyIcon type="primary" />
          <p className="text text_type_main-large">610</p>
          <Button htmlType="button" type="primary" size="large" onClick={onClick}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;


<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

<div>

</div>


</div>