import { createContext, PropsWithChildren, FC } from "react";
import axios from "axios";

export type AuthContextType = {
     LoginUser: (
          e: React.FormEvent<HTMLFormElement>,
          userData: any
     ) => void
}
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
     const LoginUser = async (e: React.FormEvent, userData: any) => {
          e.preventDefault();
          console.log(userData);
          const data = await axios.post("http://localhost:5000/api/login", userData);
          console.log(data)
     }

     return <AuthContext.Provider value={{LoginUser}} >
          {children}
     </AuthContext.Provider>
}

export default AuthProvider;