import React, { useCallback } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIngredients,
  updateConstuctorElements,
} from "../../store/ingredients-slice";
import { createPostRequest } from "../../store/consctructor-slice";
import { useDrop } from "react-dnd";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { useNavigate } from "react-router-dom";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { bun, filings } = useSelector(
    (state) => state.ingredients.selectedIngredients
  );

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "constructor",
    drop(data) {
      dispatch(selectIngredients(data));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const constructorElements = React.useMemo(() => {
    if (!bun) {
      return null;
    }
    return [bun, ...filings];
  });

  const orderDetails = React.useMemo(() => {
    if (!constructorElements) {
      return null;
    } else {
      return constructorElements.reduce((prev, curr) => {
        return [...prev, curr._id];
      }, []);
    }
  }, [constructorElements]);

  const totalPrice = React.useMemo(() => {
    if (!constructorElements) {
      return 0;
    } else {
      return constructorElements.reduce(
        (sum, element) =>
          sum + (element.type === "bun" ? element.price * 2 : element.price),
        0
      );
    }
  }, [constructorElements]);

  const onClick = () => {
    dispatch(createPostRequest(orderDetails));
  };

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = filings[dragIndex];
      const hoverItem = filings[hoverIndex];
      const newFilings = [...filings];
      newFilings[dragIndex] = hoverItem;
      newFilings[hoverIndex] = dragItem;
      dispatch(updateConstuctorElements(newFilings));
    },
    [filings]
  );

  const isHovered = isHover ? styles.onHover : styles.constructor;

  if (!bun) {
    return (
      <div className={`${isHovered}`} ref={dropTarget}>
        <div className={styles.mainElement}>
          <h2 className="text text_type_main-medium mt-5 ml-2">
            Пожалуйста, прежде всего добавьте булку...
          </h2>
        </div>
        <div className={`${styles.bill} mr-4`} key="bill">
          <CurrencyIcon type="primary" />
          <p className="text text_type_main-large">{totalPrice}</p>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass={styles.disabled}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={isHovered} ref={dropTarget}>
        <div className={`${styles.topLock} pr-6`}>
          <ConstructorElement
            text={`${bun.name} (верх)`}
            type="top"
            isLocked={true}
            prise={bun.price}
            thumbnail={bun.image_mobile}
          ></ConstructorElement>
        </div>
        <div className={styles.mainElement}>
          {filings.map((item, i) => (
            <ConstructorCard
              item={item}
              key={item.uuidId}
              index={i}
              moveIngredient={moveIngredient}
            />
          ))}
        </div>
        <div className={`${styles.bottonLock} mr-6`}>
          <ConstructorElement
            text={`${bun.name} (низ)`}
            type="bottom"
            isLocked={true}
            prise={bun.price}
            thumbnail={bun.image_mobile}
            extraClass={styles.element}
          />
        </div>
        <div>
          <div className={`${styles.bill} mr-4`} key="bill">
            <CurrencyIcon type="primary" />
            <p className="text text_type_main-large">{totalPrice}</p>
            {!user && (
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Необходимо авторизоваться
              </Button>
            )}
            {user && (
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                onClick={onClick}
              >
                Оформить заказ
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default BurgerConstructor;
