import React,{ useState} from "react";
const AuthContext = React.createContext(
  {  
    token:'',
    login: (token) => {},
    logout: () => {},
  }
)

export  const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token') 
  const [token, setToken] = useState(initialToken)


  const loginHandler = (token) => {
    setToken(token)
    localStorage.setItem('token',token)
  }                                    

  const logoutHandler = () => {
      
  }     

  const ContextValues = {
    token:token,
    login:loginHandler,
    logout:logoutHandler,
  }

  console.log('this is token',token)



  return  <AuthContext.Provider value={ContextValues}>{props.children}</AuthContext.Provider>
}
export default AuthContext;