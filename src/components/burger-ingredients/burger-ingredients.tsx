import React, { useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import IngredientsList from "../burger-ingredients-list/burger-ingredients-list";
import { useInView } from "react-intersection-observer";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../utils/hooks";
import { allIngredientsSelector } from "../../store/selectors/selectors";

export default function BurgerIngredients() {
  const ingredients = useAppSelector(allIngredientsSelector);

  const [current, setCurrent] = React.useState("buns");

  const [bunsRef, bunsInView] = useInView({ threshold: 0.01 });
  const [mainRef, mainInView] = useInView({ threshold: 0 });
  const [saucesRef, saucesInView] = useInView({ threshold: 0.01 });

  function handleClickTab(tab:string) {
    setCurrent(tab);
    const ingredientList = document.getElementById(tab);
    if (ingredientList) ingredientList.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (bunsInView) {
      setCurrent("buns");
    } else if (saucesInView) {
      setCurrent("sauces");
    } else if (mainInView) {
      setCurrent("main");
    }
  }, [bunsInView, saucesInView, mainInView]);

  return (
    <div data-testid='ingredients' className={styles.section}>
      <div className={styles.tab}>
        <Tab
          value="buns"
          active={current === "buns"}
          onClick={() => handleClickTab("buns")}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === "sauces"}
          onClick={() => handleClickTab("sauces")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => handleClickTab("main")}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.wrapper}>
        <IngredientsList
          type="bun"
          data={ingredients}
          innerRef={bunsRef}
          name="buns"
        />
        <IngredientsList
          type="sauce"
          data={ingredients}
          innerRef={saucesRef}
          name="sauces"
        />
        <IngredientsList
          type="main"
          data={ingredients}
          innerRef={mainRef}
          name="main"
        />
      </div>
    </div>
  );
}
