import { useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { deleteIngredient, updateConstuctorElements } from "../store/ingredients-slice";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor-card.module.css';




export const ConstructorCard = ({item, index, moveIngredient}) => {

  const dispatch = useDispatch();
  // const ref = useRef<HTMLLIElement>(null);

  const [{isDragging}, dragRef] = useDrag({
    type: 'constructorItem',
    item: {index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{isHover}, dropRef] = useDrop({
    accept: 'constructorItem', 
    drop: (item, monitor) => {
      const dragIndex = item.index;
      const dropIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top ;

      if (dragIndex < dropIndex && hoverActualY < hoverMiddleY) return
      if (dragIndex > dropIndex && hoverActualY > hoverMiddleY) return
      moveIngredient(dragIndex, dropIndex)
      item.index = dropIndex
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    })
    // drop: (item, monitor) => {}
  })

  const ref = useRef(null)
  const dragDropRef = dragRef(dropRef(ref))


  function deleteConstructorIngredient(uuid) {
    dispatch(deleteIngredient(uuid))
    
  };


  // ${hovered}
  const dragged = isDragging? styles.dragged : '';
  const hovered = isHover? styles.hovered : '';
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
  )
}