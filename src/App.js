import SignupForm from "./Authentication/SignupForm";
import { Route,Routes } from 'react-router-dom'
import Login from "./Authentication/Login";
import Profile from "./components/Profile";
import ForgetPassword from "./Authentication/ForgetPassword";
import ExpenseForm from "./components/ExpenseForm";
import Header from "./components/UI/Header";
import { useNavigate } from "react-router-dom";
import classes from './App.module.css';
import { useSelector,useDispatch } from "react-redux";
import Home from "./components/Home";
import { authActions } from "./Store/auth-slice";


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useSelector(state => state.theme.theme)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  console.log(isLoggedIn)
  // const [email,setEmail] = useState('')
  // const getEmail = (email) => {
  //   setEmail(email)
  // }
   setTimeout(() => {
    dispatch(authActions.logout())
    navigate("/Login")
   },300000)
 
  return (
    <div className={classes[`${theme}`]}>
        <Header/>
        <Routes>
        <Route path="/"  element={<SignupForm/>}/>
        <Route path="/Home" element={<Home/>}/>
        {!isLoggedIn && <Route path="/Login"  element={<Login/>}/>}
       {isLoggedIn && <Route path="/Profile" element={<Profile/>}/>} 
        <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
        {isLoggedIn && <Route path="/ExpenseForm" element={<ExpenseForm />}/>}
        
        </Routes>
    </div>
  );
}

export default App;
