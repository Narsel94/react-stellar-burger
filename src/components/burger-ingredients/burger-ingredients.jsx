import React, { useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import IngredientsList from "../burger-ingredients-list/burger-ingredients-list";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerIngredients() {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const [current, setCurrent] = React.useState("buns");

  const [bunsRef, bunsInViev] = useInView({ threshold: 0 });
  const [mainRef, mainInViev] = useInView({ threshold: 0 });
  const [saucesRef, saucesInView] = useInView({ threshold: 0 });

  function handleClickTab(tab) {
    setCurrent(tab);
    const ingredientList = document.getElementById(tab);
    console.log(ingredientList);
    if (ingredientList) ingredientList.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (bunsInViev) {
      setCurrent("buns");
    } else if (saucesInView) {
      setCurrent("sauces");
    } else if (mainInViev) {
      setCurrent("main");
    }
  }, [bunsInViev, saucesInView, mainInViev]);

  return (
    <div className={styles.section}>
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
