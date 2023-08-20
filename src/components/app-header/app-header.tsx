import React, { FC } from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AppHeader: FC = () => {
  const activeLinkColor = {
    color: "#fff",
  };

  const matchHome = useMatch("/");
  const matchFeed = useMatch("/feed");
  const matchProfile = useMatch("/profile");
  const navigate = useNavigate();

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <ul className={styles.headerList}>
        <li>
          <nav className={styles.linkGroup}>
            <NavLink
              to="/"
              className={styles.link}
              style={({ isActive }) => (isActive ? activeLinkColor : undefined)}
            >
              <BurgerIcon type={Boolean(matchHome) ? "primary" : "secondary"} />
              <span className="text text_type_main-default">Конструктор</span>
            </NavLink>
            <NavLink
              to="/feeds"
              className={styles.link}
              style={({ isActive }) => (isActive ? activeLinkColor : undefined)}
            >
              <ListIcon type={Boolean(matchFeed) ? "primary" : "secondary"} />
              <span className="text text_type_main-default">Лента заказов</span>
            </NavLink>
          </nav>
        </li>
        <li className={styles.listItemLogo} onClick={()=> navigate('/')}>
          <Logo />
        </li>
        <li>
          <NavLink
            to="/profile"
            className={styles.link}
            style={({ isActive }) => (isActive ? activeLinkColor : undefined)}
          >
            <ProfileIcon
              type={Boolean(matchProfile) ? "primary" : "secondary"}
            />
            <span className="text text_type_main-default">Личный кабинет</span>
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default AppHeader;
