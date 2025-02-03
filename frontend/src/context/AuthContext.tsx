import { createContext, PropsWithChildren, FC, useState } from "react";
import axios from "axios";

export type AuthContextType = {
     LoginUser: (
          e: React.FormEvent<HTMLFormElement>,
          userData: any
     ) => void,

     RegisterUser: (
          e: React.FormEvent<HTMLFormElement>, 
          userData: any
     ) => void,

     LogoutUser: () => void,
     message: string,
     auth: boolean
}
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
     const [message, setMessage] = useState("");
     const [auth, setAuth] = useState(false);

     const LoginUser = async (e: React.FormEvent, userData: any) => {
          e.preventDefault();

          axios.post(
               "http://localhost:5000/api/login", 
               userData,
               {withCredentials: true}
          ).then(response => {
               setMessage(response.data.message);
               setAuth(true);
          }).catch(error => {
               setMessage(error.response.data.message);
          });
     }

     const LogoutUser = async () => {
          await axios.post(
               "http://localhost:5000/api/logout", 
               {},
               {withCredentials: true}
          ).then(response => {
               setMessage(response.data.message);
               setAuth(false);
          }).catch(error => {
               setMessage(error.response.data.message);
          });
          setTimeout(()=>{setMessage("")},3000);
     }

     const RegisterUser = async (e: React.FormEvent, userData: any) => {
          e.preventDefault();

          await axios.post(
               "http://localhost:5000/api/register", 
               userData
          ).then(response => {
               setMessage(response.data.message);
          }).catch(error => {
               setMessage(error.response.data.message);
          });
          setTimeout(()=>{setMessage("")},3000);
     }

     return <AuthContext.Provider value={{
          LoginUser, 
          RegisterUser, 
          message,
          auth,
          LogoutUser
     }}>
          {children}
     </AuthContext.Provider>
}

export default AuthProvider;