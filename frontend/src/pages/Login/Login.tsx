import { useState } from "react";
import "./Login.scss";

const Login = () => {
  return (
    <div className="container login_container">

      <form className="login_form">
        <h2>Вход в систему</h2>
        <label htmlFor="userName">Имя пользователя</label>

        <input 
          id="userName" 
          type="text" 
        />
        <label htmlFor="userPassword">Пароль</label>

        <input 
          type="text" 
          id="userPassword" 
        />

        <button type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;