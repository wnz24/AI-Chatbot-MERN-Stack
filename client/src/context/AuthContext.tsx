import React, { useContext, useEffect } from "react";
import { createContext, ReactNode } from "react";
import { checkAuthStatus, loginuser, signupuser } from "../helpers/api-communicator";



type User= {
   name:string,
   email: string
}
type userAuth = {
    isLoggedIn : boolean,
    user:User | null
    login:(email: string, password : string)=> Promise<void>;
    signup:(name:string, email: string, password : string)=> Promise<void>;
    logout:()=> Promise<void>;
}
const AuthContext = createContext<userAuth | null>(null)

export const AuthProvider = ({children}:{children: ReactNode})=>{
    const [user, setUser] = React.useState<User | null>(null);
    const [isLoggedIn, setisLoggedIn] = React.useState(false);

    useEffect(() => {
    //fetch if the user cookies are valid then skip login
      async function checkstatus(){
        const data = await checkAuthStatus();
        if(data){
          setUser({email:data.email,name: data.name}) 
          setisLoggedIn(true);
        }
        
      }
      checkstatus();
    }, [])
    const login = async(email: string, password:string)=>{
   
      const data = await loginuser(email,password)
      if(data){
       setUser({email:data.email,name: data.name}) 
       setisLoggedIn(true);
      
      } 
    };
      const signup = async(name :string, email: string, password:string)=>{
        const data = await signupuser(name,email,password)
        if(data.user){
         setUser({email:data.email,name: data.name}) 
         setisLoggedIn(true);
         
        }
      };
      const logout = async()=>{};

      const value ={
        user,
        isLoggedIn,
        login,
        signup,
        logout
      }

        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

     
}

export const useAuth=()=> useContext(AuthContext);
