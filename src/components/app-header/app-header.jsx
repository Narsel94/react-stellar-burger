import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import NavigationLink from "../header-naigation-link/header-navigation-link";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

function AppHeader() {
  const setNavStyle = ({isActive}) => {
   return isActive? styles.activeLink : styles.link
    
  }
  
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <ul className={styles.headerList}>
        <li>
          <nav className={styles.linkGroup}>
            <NavLink
              to="/"
              className={setNavStyle}
            >
              <BurgerIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive">
                Конструктор
              </span>
            </NavLink>
            <NavLink
              to="/feed"
              className={setNavStyle}
            >
              <ListIcon className="mr-2" type="secondary" />
              <span className="text text_type_main-default text_color_inactive">
                Лента заказов
              </span>
            </NavLink>
          </nav>
        </li>
        <li className={styles.listItemLogo}>
          <Logo />
        </li>
        <li>
          <NavLink
            to="/profile"
            className={setNavStyle}
          >
            <ProfileIcon className="mr-2" type="secondary" />
            <span className="text text_type_main-default text_color_inactive">
              Личный кабинет
            </span>
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default AppHeader;
