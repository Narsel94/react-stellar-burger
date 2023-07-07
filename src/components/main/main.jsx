import React from "react";
import Section from "../section/section";
import styles from "./main.module.css";
import { render } from "react-dom";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import TabBar from "../tab-bar/tab-bar";
import BurgerConstructor from "../burger-constructor/burger-constructor";

export default function Main({data, setIsModalOpen, setInfo, setChildren}) {

  return (
    <main className={styles.main}>
      <Section>
       
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1> 
        <TabBar/>
       < BurgerIngredients data={data} setIsModalOpen={setIsModalOpen} setInfo={setInfo} setChildren={setChildren}/>  
      </Section>
      <Section>
        <BurgerConstructor data={data} setChildren={setChildren} setIsModalOpen={setIsModalOpen}/>
      </Section>
    

    </main>
  )

}