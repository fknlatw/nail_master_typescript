import { useContext, useState } from "react";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import "./Login.scss";

const Login = () => {
  const {LoginUser} = useContext(AuthContext) as AuthContextType;
  const [userData, setUserData] = useState({
    userName: "",
    userPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setUserData(prevState => ({...prevState, [name]: value}));
  }

  return (
    <div className="container login_container">

      <form onSubmit={(e)=> LoginUser(e, userData)}className="login_form">
        <h2>Вход в систему</h2>
        <label htmlFor="userName">Имя пользователя</label>

        <input 
          type="text" 
          name="userName"
          value={userData.userName}
          onChange={handleChange}
        />
        <label htmlFor="userPassword">Пароль</label>

        <input 
          type="text" 
          name="userPassword" 
          value={userData.userPassword}
          onChange={handleChange}
        />

        <button type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;