import React, { useCallback} from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { openOrderDetailsModal } from "../store/modal-slice";
import { deleteIngredient, selectIngredients, updateConstuctorElements } from "../store/ingredients-slice";
import { setOrderDetails, postOrder, createPostRequest } from "../store/consctructor-slice";
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorCard } from "../constructor-card/constructor-card";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, filings } = useSelector(
    (state) => state.ingredients.selectedIngredients
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "constructor",
    drop(data) {
      dispatch(selectIngredients(data));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });


  // точно переделать на createSelector
  const constructorElements = React.useMemo(() => {
    if (!bun) {
      return null;
    }
    return [bun, ...filings];
  });

  // возможно надо переделать на createSelector
  const orderDetails = React.useMemo(() => {
    if (!constructorElements) {
      return null;
    } else {
      return constructorElements.reduce((prev, curr) => {
        return [...prev, curr._id];
      }, []);
    }
  }, [constructorElements]);
  
  // переделать на createSelector
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
    // dispatch(openOrderDetailsModal());
    dispatch(createPostRequest(orderDetails))
  };


  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    const dragItem = filings[dragIndex];
    const hoverItem = filings[hoverIndex];
    console.log(dragItem)
    console.log(hoverItem)
    const newFilings = [...filings]
    newFilings[dragIndex] = hoverItem
    newFilings[hoverIndex] = dragItem
    dispatch(updateConstuctorElements(newFilings))
  }, [filings])



  const isHovered = isHover ? styles.onHover : styles.constructor;

  if (!bun) {
    return (
      // <div className={`${styles.constructor} ${{isHovered}}`} ref={dropTarget}>
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
            text={bun.name}
            type="top"
            isLocked={true}
            prise={bun.price}
            thumbnail={bun.image_mobile}
          ></ConstructorElement>
        </div>
        <div className={styles.mainElement}>
          {filings.map((item, i) => (
            <ConstructorCard item={item} key={item.uuidId} index={i} moveIngredient={moveIngredient}/>
          ))}
        </div>
        <div className={`${styles.bottonLock} mr-6`}>
          <ConstructorElement
            text={bun.name}
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
            <Button
              htmlType="submit"
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
  }
};

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape({
//     _id: PropTypes.string,
//     name: PropTypes.string,
//     type: PropTypes.string,
//     proteins: PropTypes.number,
//     fat: PropTypes.number,
//     carbohydrates: PropTypes.number,
//     calories: PropTypes.number,
//     price: PropTypes.number,
//     image: PropTypes.string,
//     image_mobile: PropTypes.string,
//     image_large: PropTypes.string,
//     __v: PropTypes.number,
//   })).isRequired,
// };

export default BurgerConstructor;
