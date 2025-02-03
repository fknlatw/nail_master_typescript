import { AuthContext, AuthContextType } from "../../context/AuthContext";
import "./Register.scss";
import {useContext, useState} from "react";


const Register = () => {
  const {RegisterUser, message} = useContext(AuthContext) as AuthContextType;

  const [userData, setUserData] = useState({
    userName: "",
    userPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setUserData(prevState => ({...prevState, [name]: value}));
  }

  return (
    <div className="container register_container">
      <form 
        onSubmit={(e)=>RegisterUser(e, userData)} 
        className="register_form"
      >
        <h2>Регистрация в базе</h2>
        <label htmlFor="userName">Имя пользователя</label>

        <input 
          name="userName" 
          value={userData.userName}
          onChange={handleChange}
          type="text" 
        />
        <label htmlFor="userPassword">Пароль</label>

        <input 
          type="text" 
          name="userPassword" 
          value={userData.userPassword}
          onChange={handleChange}
        />

        <button type="submit">Регистрация</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  )
}

export default Register