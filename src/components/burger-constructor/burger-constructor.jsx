import React from "react";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { openOrderDetailsModal } from "../store/modal-slice";
import { deleteIngredient } from '../store/ingredients-slice';
import {setOrderElements, postOrder} from '../store/consctructor-slice'

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, filings } = useSelector(
    (state) => state.ingredients.selectedIngredients
  );



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
      }, [])
    }
  }, [constructorElements])

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
    if (orderDetails) {
      dispatch(setOrderElements(orderDetails));
      postOrder(orderDetails)
    }
  };

  const onSubmit = (e) => {
    postOrder()
  }
 

  React.useEffect(()=> {
    function onSubmit()  {
      postOrder()
     
    }
    document.addEventListener("submit", onSubmit);

  }, [orderDetails])

  if (!bun) {
    return (
      <div className={styles.constructor}>
        <div className={styles.mainElement}>
          <h2 className="text text_type_main-medium mt-5">Пожалуйста, прежде всего добавте булку...</h2>
        </div>
        <div className={`${styles.bill} mr-4`} key="bill">
            <CurrencyIcon type="primary"/>
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
    );
  } else {
    return (
      <div className={styles.constructor} >
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
          {filings.map((item) => (
            <div className={`${styles.mainItem} pr-4 pl-4`} key={item._id}>
              <DragIcon type="primary"/>
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
  }
}

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
