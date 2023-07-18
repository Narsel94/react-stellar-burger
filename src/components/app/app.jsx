import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import Preloader from "../loader/loader";
import { Modal } from "../modal/modal";
// import { getIngredientData } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredientsData } from "../store/ingredients-slice";


function App() {
  const {isOrderModalOpen, isIngredientModalOpen} = useSelector(state => state.modal)
  const {status, error} = useSelector(state => state.ingredients)
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(fetchIngredientsData());
  }, [dispatch])

  if (status === 'loading') {
    return <Preloader />;
  } else if (error) { 
    return (
      <h1 className="text text_type_main-medium">Что-то пошло не так, error:{error} </h1>
    )
  }
  
  else {
    return (
      <div className={styles.app}>
        <AppHeader />
        <Main></Main>
        {(isOrderModalOpen || isIngredientModalOpen) && <Modal />}
      </div>
    );
  }
}

export default App;
