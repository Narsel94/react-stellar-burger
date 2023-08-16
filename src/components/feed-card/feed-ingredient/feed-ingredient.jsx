import React, {FC, JSXElementConstructor} from 'react'
import { useAppSelector } from "../../../utils/hooks";
import styles from "./feed-ingredient.module.css"


const FeedIngredient = ({id, index, length}) => {
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const info = ingredients.find((item) => item._id === id)

  const style = {
    zIndex:index
  }
  
  return (
    id &&
      <li style={style} className={styles.wrapper}>
      <img className={styles.image}  src={info.image_mobile} alt={info.name} />
      {(length > 7 && index === 0) &&
        <p className={`${styles.counter} text text_type_digits-default`}>+{length-7}</p>

      }
      </li>

    
    
  )
}

export default FeedIngredient