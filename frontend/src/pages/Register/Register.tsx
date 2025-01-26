import "./Register.scss";

const Register = () => {
  return (
    <div className="container register_container">
      <form className="register_form">
        <h2>Регистрация в базе</h2>
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

        <button type="submit">Регистрация</button>
      </form>
    </div>
  )
}

export default Register