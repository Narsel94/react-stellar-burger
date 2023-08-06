import React, { useState } from 'react';
import styles from './forgote-password.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function ForgotPassword() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const location = useLocation();

  const onChange = (evt) => {
    setEmail(evt.target.value);
  }

  return (
    <section className={styles.page}>
      <h1 className='text text_type_main-medium mb-8'>Восстановление пароля</h1>
      <form >
        <EmailInput placeholder='Укажите e-mail'  extraClass={'mb-6'} value={email} onChange={onChange}/>
      </form>
      <Link to={"/reset-password"} replace={true} state={true}>
        <Button htmlType="button" type="primary" size="medium" >
          Восстановить
        </Button>
      </Link>
      
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