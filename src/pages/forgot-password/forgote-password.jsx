import React, { useState } from 'react';
import styles from './forgote-password.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, Link, useLocation, Navigate } from 'react-router-dom';
import { postEmailForResetPassword } from '../../api/api';

function ForgotPassword() {

  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const location = useLocation();

  const onChange = (evt) => {
    setEmail(evt.target.value);
    console.log(evt.target.value)
  }

  const onButtonClick = () => {
    postEmailForResetPassword(email)
      .then((res) => {
        if (res.success) {
          // <Navigate to={"/reset-password"} replace={true} state={{email:email}}/>
          navigate('/reset-password', {state:{email:email}, replace:true})
        }
      })
  }

  return (
    <section className={styles.page}>
      <h1 className='text text_type_main-medium mb-8'>Восстановление пароля</h1>
      <form >
        <EmailInput placeholder='Укажите e-mail'  extraClass={'mb-6'} value={email} onChange={onChange}/>
      </form>
      {/* <Link to={"/reset-password"} replace={true} state={{email:email}}> */}
        <Button htmlType="button" type="primary" size="medium" onClick={onButtonClick} >
          Восстановить
        </Button>
      {/* </Link> */}
      
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
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
  )
}

export default ForgotPassword