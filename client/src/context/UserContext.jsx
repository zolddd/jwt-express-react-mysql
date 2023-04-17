import { createContext,useContext,useState } from "react";

export const UserContext = createContext();

export const useContextUser=()=>{
 const context=useContext(UserContext);
 if(!context){
    throw new Error("No esta dentro de UserContextProvider")
 }
 return context;
}
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  );
};