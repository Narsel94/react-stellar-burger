import React, { useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import { getIngredientData } from "../api/api";
import Preloader from "../loader/loader";
import { Modal } from "../modal/modal";
import { useSelector, useDispatch} from "react-redux";
import { getData,getTextData } from "../../services/actions/ingredients";

function App() {
  const [state, setState] = React.useState({
    ingredientData: null,
    isLoading: false,
  });

  const ingredientData = useSelector(state => state.indredients)

  const dispatch= useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState(null);

  const {isOrderModalOpen, isIngredientModalOpen} = useSelector(state => state.modal)
  

  React.useEffect(() => {
    setState({ ...state, isLoading: true });
    dispatch(getIngredientData())
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
          data={ingredientData}
    
        ></Main>
        {isOrderModalOpen || isIngredientModalOpen  && (
          <>
            <Modal

            ></Modal>
          </>
        )}
        
      </div>
    );
  }
}

export default App;
