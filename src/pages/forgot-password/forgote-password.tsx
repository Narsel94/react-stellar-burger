import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import styles from "./forgote-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { postEmailForResetPassword } from "../../api/api";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Забыли пароль?"
  }, [])


  const onChange = (evt:ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const onSubmitHandler = (e:FormEvent) => {
    e.preventDefault();
    postEmailForResetPassword(email).then((res) => {
      if (res.success) {
        navigate("/reset-password", { state: { email: email }, replace: true });
      }
    });
  };

  return (
    <section className={styles.page}>
      <h1 className="text text_type_main-medium mb-8">Восстановление пароля</h1>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <EmailInput
          placeholder="Укажите e-mail"
          extraClass={"mb-6"}
          value={email}
          onChange={onChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Восстановить
        </Button>
      </form>

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
    </section>
  );
}

export default ForgotPassword;
