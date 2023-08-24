import React, { ChangeEvent, FormEvent, useEffect } from "react";
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
import { useAppDispatch } from "../../utils/hooks";

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = React.useState("name");
  const [password, setPassword] = React.useState("password");
  const [email, setEmail] = React.useState("email");

  useEffect(()=>{
    document.title = "Регистрация"
  },[])

  const onChangeName = (e:ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e:ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e:ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <form className={styles.form} onSubmit={onSubmitHandler}>
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
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.button}
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
