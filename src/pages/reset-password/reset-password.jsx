import React, { useState } from "react";
import styles from "./reset-password.module.css";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const onPassChange = (evt) => {
    setPassword(evt.target.value);
  };

  const onCodeChange = (evt) => {
    setCode(evt.target.value);
  };

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  return (
    <div className={styles.page}>
      <h1 className="text text_type_main-medium mb-8">Восстановление пароля</h1>

      <PasswordInput
        value={password}
        placeholder="Введите новый пароль"
        onChange={onPassChange}
      />
      <Input
        value={code}
        placeholder="Введите код из письма"
        onChange={onCodeChange}
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mt-6">
        Сохранить
      </Button>
      <p
        className={`${styles.text} text text_type_main-default text_color_inactive`}
      >
        Вспомнили пароль?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="p-2"
          onClick={() => navigate("/login")}
        >
          Войти
        </Button>
      </p>
    </div>
  );
}

export default ResetPassword;
