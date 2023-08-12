import React, { useRef, FC } from "react";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { deleteIngredient } from "../../store/ingredients-slice";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-card.module.css";
import PropTypes from "prop-types";
import { TConstructorCardProps, TIngredientWithUuidId } from "../../utils/types";
import { useAppDispatch } from "../../utils/hooks";

type DraggingItem = {
  index: number;
};

export const ConstructorCard: FC<TConstructorCardProps> = ({
  item,
  index,
  moveIngredient,
}) => {
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: "constructorItem",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isHover }, dropRef] = useDrop({
    accept: "constructorItem",
    drop: (item: DraggingItem, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const dropIndex = index;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      // @ts-ignore
      const hoverActualY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < dropIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > dropIndex && hoverActualY > hoverMiddleY) return;
      moveIngredient(dragIndex, dropIndex);
      item.index = dropIndex;
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const ref = useRef<HTMLDivElement>(null);
  dragRef(dropRef(ref));

  function deleteConstructorIngredient(item: TIngredientWithUuidId) {
    dispatch(deleteIngredient(item));
  }

  const dragged = isDragging ? styles.dragged : "";
  const hovered = isHover ? styles.hovered : "";
  return (
    <div ref={ref} className={`${styles.card} ${dragged} `}>
      <div className="pr-2">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => {
          deleteConstructorIngredient(item);
        }}
        extraClass={hovered}
      />
    </div>
  );
};

// ConstructorCard.propTypes = {
//   item: ingredientPropType,
//   index: PropTypes.number,
//   moveIngredient: PropTypes.func,
// };
