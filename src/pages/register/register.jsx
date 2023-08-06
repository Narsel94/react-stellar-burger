import React from "react";
import styles from "./register.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registrateUser } from "../../store/user-slice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = React.useState("name");
  const [password, setPassword] = React.useState("password");
  const [email, setEmail] = React.useState("email");

  const onChangeName = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const onClick = () => {
    const formData = {
      email: email,
      password: password,
      name: name,
    };
    dispatch(registrateUser(formData));
  };

  return (
    <div className={styles.register}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <form className={styles.form}>
        <Input
          type="text"
          value={name}
          placeholder={"Имя"}
          name={"name"}
          size={"default"}
          onChange={onChangeName}
        />
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          placeholder={"E-mail"}
        />
        <PasswordInput
          onChange={onChangePassword}
          value={password}
          name={"password"}
        />

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass={styles.button}
          onClick={onClick}
        >
          Зарегестрироваться
        </Button>
      </form>

      <p className="text text_type_main-small text_color_inactive mt-8">
        Уже зарегестрированны?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => navigate("/login")}
        >
          Войти
        </Button>
      </p>
    </div>
  );
}

export default Register;
