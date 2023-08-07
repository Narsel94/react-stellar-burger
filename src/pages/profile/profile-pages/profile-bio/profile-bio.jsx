import React, { useEffect, useState } from "react";
import styles from "./profile-bio.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { patchUserData } from "../../../../store/user-slice";

function ProfileBio() {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.user.user.name);
  const email = useSelector((state) => state.user.user.email);
  const password = "********";

  const [formName, setFormName] = useState(name);
  const [formEmail, setFormEmail] = useState(email);
  const [formPassword, setFormPassword] = React.useState("********");

  function onNameChange(e) {
    setFormName(e.target.value);
  }

  function onEmailChange(e) {
    setFormEmail(e.target.value);
  }

  function onPassChange(e) {
    setFormPassword(e.target.value);
  }

  const patchNewUserData = (e) => {
    e.preventDefault();
    console.log(e);
    const newUserData = {
      email: formEmail,
      password: formPassword,
      name: formName,
    };
    dispatch(patchUserData(newUserData));
  };

  function cancelChanging() {
    setFormName(name);
    setFormEmail(email);
    setFormPassword(password);
  }

  let isVisible =
    name !== formName || email !== formEmail || password !== formPassword
      ? null
      : styles.invisible;

  return (
    <section className={styles.page}>
      <form className={styles.form} onSubmit={patchNewUserData}>
        <Input
          type={"text"}
          value={formName}
          placeholder={"Имя"}
          onChange={onNameChange}
          icon={"EditIcon"}
        />
        <EmailInput
          type={"email"}
          placeholder={"Логин"}
          isIcon={true}
          value={formEmail}
          onChange={onEmailChange}
        />
        <PasswordInput
          onChange={onPassChange}
          value={formPassword}
          name={"password"}
          extraClass="mb-2"
        />
        <div className={`${styles.buttons} ${isVisible}`}>
          <Button htmlType="submit" type="primary">
            Coxpанить
          </Button>
          <Button htmlType="button" type="secondary" onClick={cancelChanging}>
            Отмена
          </Button>
        </div>
      </form>
    </section>
  );
}

export default ProfileBio;
