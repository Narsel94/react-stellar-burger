import React, { useEffect, useState } from "react";
import styles from "./profile-bio.module.css"
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

  const [formName, setFormName] = useState(name);
  const [formEmail, setFormEmail] = useState(email);
  const [password, setFormPassword] = React.useState("********");





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
    const newUserData = {
      email: formEmail,
      password: password,
      name: formName
    };
    dispatch(patchUserData(newUserData));
  }

  function cancelChanging() {
    setFormName(name);
    setFormEmail(email);
    setFormPassword('********')
  }

 //   mail

//  ivan_petrov123@internet.ru
 //  258147369I

 //login ivan_petrov123@internet.ru
 //pass 123123

  return (
    <section className={styles.page}>
      <Input
        type={"text"}
        value={formName}
        placeholder={"Имя"}
        onChange={onNameChange}
        icon={'EditIcon'}
        
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
        value={password}
        name={"password"}
        extraClass="mb-2"
      />
      <div className={styles.buttons}>
        <Button htmlType="button" type="primary" onClick={patchNewUserData}>Coxpанить</Button>
        <Button htmlType="button" type="secondary" onClick={cancelChanging}>Отмена</Button>
      </div>

    </section>
  );
}

export default ProfileBio;
