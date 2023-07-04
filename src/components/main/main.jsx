import React from "react";
import Section from "../section/section";
import styles from "./main.module.css";
import { render } from "react-dom";
import IngredientsList from "../card/card";

export default function Main() {

  return (
    <main className={styles.main}>
      <Section>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <IngredientsList type="bun"/>
        <IngredientsList type="sauce"/>
        <IngredientsList type="main"/>        
      </Section>
      <Section/>
    

    </main>
  )

}