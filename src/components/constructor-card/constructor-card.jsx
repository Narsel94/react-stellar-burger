import {  useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  deleteIngredient,
} from "../store/ingredients-slice";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-card.module.css";
import PropTypes from "prop-types";


export const ConstructorCard = ({ item, index, moveIngredient }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: "constructorItem",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isHover }, dropRef] = useDrop({
    accept: "constructorItem",
    drop: (item, monitor) => {
      const dragIndex = item.index;
      const dropIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < dropIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > dropIndex && hoverActualY > hoverMiddleY) return;
      moveIngredient(dragIndex, dropIndex);
      item.index = dropIndex;
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  function deleteConstructorIngredient(uuid) {
    dispatch(deleteIngredient(uuid));
  }

  const dragged = isDragging ? styles.dragged : "";
  const hovered = isHover ? styles.hovered : "";
  return (
    <div ref={dragDropRef} className={`${styles.card} ${dragged} `}>
      <div className="pr-2">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => {
          dispatch(deleteConstructorIngredient(item.uuidId));
        }}
        extraClass={hovered}
      />
    </div>
  );
};

ConstructorCard.propTypes = {
  item: PropTypes.shape({
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
  index: PropTypes.number, 
  moveIngredient: PropTypes.func 
}
