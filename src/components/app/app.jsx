import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import Card from "../card/card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function App() {
  return (
    <div className={styles.app}>
     <AppHeader/>
     <Main>
      
     
     </Main>
    </div>
  );
};

export default App;
