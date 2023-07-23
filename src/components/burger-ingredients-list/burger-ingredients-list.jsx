import React, {forwardRef} from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients-list.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

function IngredientsList({type, data, innerRef}) {
  const filteredIngedients = React.useMemo(
    (() => data.filter((ingr) => ingr.type === type)), [data]
  );

  return (
    <div ref={innerRef} className={`${styles.ingredientsList} list ml-4 mr-4`} id={type}>
      {filteredIngedients.map((item) => (
        <BurgerIngredient
          ingredient={item}
          key={item._id}
          
        />
      ))}
    </div>
  );
}

export default IngredientsList;

// IngredientsList.propTypes = {
//   type: PropTypes.string,
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
