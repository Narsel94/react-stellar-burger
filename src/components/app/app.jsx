import React, { useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import { getIngredientData } from "../api/api";
import Preloader from "../loader/loader";
import { Modal } from "../modal/modal";
import { Overlay } from "../overlay/overlay";
import IngredientModal from "../modal-ingredient/modal-ingredient";

function App() {
  const [state, setState] = React.useState({
    ingredientData: null,
    isLoading: true,
  });

  const [modalChildren, setChildren] = React.useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState(null);

  React.useEffect(() => {
    setState({ ...state, isLoading: true });
    getIngredientData()
      .then((res) => {
        const data = res.data;
        setState({ ingredientData: data, isLoading: false });
      })
      .catch((err) => console.log(err));
  }, []);

  if (state.isLoading) {
    return <Preloader />;
  } else {
    return (
      <div className={styles.app}>
        <AppHeader />
        <Main
          data={state.ingredientData}
          setIsModalOpen={setIsModalOpen}
          setInfo={setInfo}
          setChildren={setChildren}
        ></Main>
        {isModalOpen && (
          <>
            <Overlay setIsModalOpen={setIsModalOpen} />
            <Modal setIsModalOpen={setIsModalOpen} info={info} setChildren={setChildren} children={modalChildren}>
            </Modal>
          </>
        )}
      </div>
    );
  }
}

export default App;
