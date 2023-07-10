import React from "react";
import styles from './tab-bar.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

const TabBar = () => {


  const [current, setCurrent] = React.useState('one')
  return (
    <div className={styles.tabBar}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        One
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Two
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Three
      </Tab>
    </div>
  )
}


export default TabBar