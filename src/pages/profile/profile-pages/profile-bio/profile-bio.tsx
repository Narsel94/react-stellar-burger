import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import styles from "./profile-bio.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { patchUserData } from "../../../../store/user-slice";
import { useAppSelector, useAppDispatch } from "../../../../utils/hooks";

function ProfileBio() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = React.useState("");

  useEffect(()=>{
        setFormName(user!.name);
      setFormEmail(user!.email)
  },[])


  if (user) {
    const name = user.name;
    const email = user.email;
    const password = "";

     
    function onNameChange(e: ChangeEvent<HTMLInputElement>) {
      setFormName(e.target.value);
    }

    function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
      setFormEmail(e.target.value);
    }

    function onPassChange(e: ChangeEvent<HTMLInputElement>) {
      setFormPassword(e.target.value);
    }

    const patchNewUserData = (e: FormEvent<HTMLFormElement>) => {
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
}

export default ProfileBio;
