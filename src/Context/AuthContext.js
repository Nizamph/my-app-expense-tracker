import { createContext, useState} from "react";
const AuthContext = createContext(
  {
    login: (token) => {},
    logout: () => {}
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
    login:loginHandler,
    logout:logoutHandler
  }



  return (
  <AuthContext.Provider value={ContextValues}>{props.children}</AuthContext.Provider>
  )
}
export default AuthContext;