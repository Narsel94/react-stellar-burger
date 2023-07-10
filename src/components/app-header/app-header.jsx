import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import NavigationLink from "../header-naigation-link/header-navigation-link";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <ul className={styles.headerList}>
        <li>
          <nav className={styles.linkGroup}>
            <NavigationLink href="#1" text="Конструктор">
              <BurgerIcon type="secondary" />
            </NavigationLink>
            <NavigationLink href="#2" text="Лента заказов">
              <ListIcon className="mr-2" type="secondary" />
            </NavigationLink>
          </nav>
        </li>
        <li className={styles.listItemLogo}>
          <Logo />
        </li>
        <li>
          <NavigationLink href="#3" text="Личный кабинет">
            <ProfileIcon className="mr-2" type="secondary" />
          </NavigationLink>
        </li>
      </ul>
    </header>
  );
}

export default AppHeader;
