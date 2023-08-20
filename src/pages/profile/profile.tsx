import React from "react";
import styles from "./profile.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { logoutUser } from "../../store/user-slice";
import { useAppDispatch } from "../../utils/hooks";

function Profile() {
  const activeLinkColor = {
    color: "#fff",
  };

  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <section className={styles.page}>
      <div className={styles.navigation}>
        <NavLink
          to="/profile"
          className={styles.navLink}
          style={({ isActive }) => (isActive ? activeLinkColor : undefined)}
          end
        >
          <span className="text text_type_main-medium">Профиль</span>
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={styles.navLink}
          style={({ isActive }) => (isActive ? activeLinkColor : undefined)}
          end
        >
          <span className="text text_type_main-medium">История заказов</span>
        </NavLink>
        <Button
          htmlType="button"
          onClick={logout}
          type="secondary"
          extraClass={`${styles.button} text text_type_main-medium text_color_inactive`}
        >
          Выход
        </Button>
        <p className="text text_type_main-small  text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <div className={styles.bio}>
        <Outlet />
      </div>
    </section>
  );
}

export default Profile;
