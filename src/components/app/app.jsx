import React, { useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import { getIngredientData } from "../api/api";
import Preloader from "../loader/loader";
import { Modal } from "../modal/modal";
import { useSelector } from "react-redux";

function App() {
  const [state, setState] = React.useState({
    ingredientData: null,
    isLoading: true,
  });

  const ingredientData = useSelector((state) => state.indredients);
  const isOrderModalOpen = useSelector((state) => state.modal.isOrderModalOpen);
  const isIngredientModalOpen = useSelector(
    (state) => state.modal.isIngredientModalOpen
  );

  const isLoading = useSelector((state) => state.ingredients.igredientsRequest)

  // React.useEffect(() => {
  //   setState({ ...state, isLoading: true });
  //   getIngredientData()
  //     .then((res) => {
  //       const data = res.data;
  //       setState({ ingredientData: data, isLoading: false });
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  if (state.isLoading) {
    return <Preloader />;
  } else {
    return (
      <div className={styles.app}>
        <AppHeader />
        <Main data={state.ingredientData}></Main>
        {(isOrderModalOpen || isIngredientModalOpen) && <Modal />}
      </div>
    );
  }
}

export default App;
