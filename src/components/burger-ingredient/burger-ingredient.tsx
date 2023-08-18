import React, { FC } from "react";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../utils/hooks";
import { TBurgerIngredientProps } from "../../utils/types";

const BurgerIngredientT: FC<TBurgerIngredientProps> = ({ ingredient }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "constructor",
    item: { ...ingredient, uuidId: uuidv4() },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const { bun, filings } = useAppSelector(
    (state) => state.ingredients.selectedIngredients
  );

  const constructorElements = React.useMemo(() => {
    if (!bun) {
      return null;
    }
    return [bun, bun, ...filings];
  }, [bun, filings]);

  const currentCount = React.useMemo(() => {
    if (!constructorElements) {
      return 0;
    }
    return constructorElements.filter(
      (element) => element._id === ingredient._id
    ).length;
  }, [constructorElements, ingredient._id]);

  //заполняем данными картинки
  const image = <img src={ingredient.image} alt={ingredient.name} />;

  const dragged = isDrag ? styles.dragged : "";

  return (
    <div
      className={`${styles.card} ${dragged} text text_type_main-default pl-4 pr-4 `}
      key={ingredient._id}
      ref={dragRef}
    >
      {currentCount > 0 && (
        <Counter
          count={currentCount}
          size="default"
          extraClass={`${styles.counter} m-1`}
        />
      )}

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

export default BurgerIngredientT;
