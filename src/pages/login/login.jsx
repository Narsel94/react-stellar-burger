import React, { useEffect } from "react";
import styles from "./login.module.css";
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/user-slice";
import { refreshTokenRequest, refTok } from "../../api/api";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  const onClick = (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    dispatch(loginUser(loginData));
  };

  return (
    <section className={styles.page}>
      <form className={styles.form}>
        <h1 className={`${styles.tilte} text text_type_main-medium mt-4`}>
          Вход
        </h1>

        <EmailInput
          type={"email"}
          placeholder={"Логин"}
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          extraClass="mt-6"
          // isIcon={true}
          // onError={() => showError()}
        />
        <PasswordInput
          onChange={onChangePassword}
          value={password}
          name={"password"}
          // icon="EditIcon"
          extraClass="mt-6"
          error={false}
        />

        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          extraClass="mt-6"
          onClick={onClick}
        >
          Войти
        </Button>
      </form>
      <div className={`${styles.linkBlock} mt-20`}>
        <p className="text text_type_main-default text_color_inactive ">
          Вы - новый пользователь?
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="p-2"
            onClick={() => navigate("/register")}
          >
            Зарегестрироваться
          </Button>
        </p>
        <p className="text text_type_main-default text_color_inactive ">
          Забыли пароль?
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="p-2"
            onClick={() => navigate("/forgot-password")}
          >
            Восстановить пароль
          </Button>
        </p>
      </div>
    </section>
  );
}

export default Login;
