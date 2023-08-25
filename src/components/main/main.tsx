import React, {useEffect} from "react";
import Section from "../section/section";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

export default function Main() {
  useEffect(() => {
    document.title = "Stellar Burger"
  }, [])

  return (
    <main data-testid='mainPage' className={styles.main}>
      <Section>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
       
        <BurgerIngredients/>
      </Section>
      <Section>
        <BurgerConstructor/>
      </Section>
    </main>
  );
}

