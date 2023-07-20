import React from "react";
import PropTypes from "prop-types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { openIngredientDetailsModal } from "../store/modal-slice";
import {
  setIngredientDetails,
  selectIngredients,
} from "../store/ingredients-slice";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

// import { addElements } from "../store/consctructor-slice";


const BurgerIngredient = ({ ingredient }) => {
  const dispatch = useDispatch();

  const {_id, name, price, image_mobile} = ingredient;
  const [{isDrag}, dragRef] = useDrag({
    type: "constructor",
    item: {...ingredient, uuidId: uuidv4()},
    collect: monitor => ({
      isDrag: monitor.isDragging()
  })
  });
  
  const { bun, filings } = useSelector(
    (state) => state.ingredients.selectedIngredients
  );

  const constructorElements = React.useMemo(() => {
    if (!bun) {
      return null;
    }
    return [bun, bun,  ...filings];
  });

  const currentCount = React.useMemo(() => {
    if (!constructorElements) {
      return 0
    }
    return constructorElements.filter((element) => element._id === ingredient._id).length
  })

  //заполняем данными картинки
  const image = <img src={ingredient.image} alt={ingredient.name} />;

  const onClick = () => {
    dispatch(openIngredientDetailsModal());
    dispatch(setIngredientDetails(ingredient));
  };

 const dragged = isDrag ? styles.dragged : ''

  return (
    
    <div
      className={`${styles.card} ${dragged} text text_type_main-default pl-4 pr-4 `}
      key={ingredient.id}
      onClick={onClick}
      ref={dragRef}
    >
      {currentCount > 0 &&  <Counter count={currentCount} size="default" extraClass={`${styles.counter} m-1`} />}
 
      <div className={styles.image}>{image}</div>
      <div className={`${styles.priceBlock} mt-1 mb-1`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.text} text text_type_main-small`}>
        {ingredient.name}
      </p>
    </div>
  );
};

BurgerIngredient.propTypes = {
  ingredient: PropTypes.shape({
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
  }).isRequired,
};

export default BurgerIngredient;
