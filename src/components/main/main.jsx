import React from "react";
import Section from "../section/section";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import TabBar from "../tab-bar/tab-bar";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import PropTypes from "prop-types";

export default function Main() {
  return (
    <main className={styles.main}>
      <Section>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <TabBar />
        <BurgerIngredients/>
      </Section>
      <Section>
        <BurgerConstructor/>
      </Section>
    </main>
  );
}

