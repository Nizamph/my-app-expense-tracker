import SignupForm from "./Authentication/SignupForm";
import { Route,Routes } from 'react-router-dom'
import Login from "./Authentication/Login";
import Profile from "./components/Profile";
import ForgetPassword from "./Authentication/ForgetPassword";
import ExpenseForm from "./components/ExpenseForm";
import Header from "./components/UI/Header";
import { useState } from "react";
function App() {
  const [email,setEmail] = useState('')
  const getEmail = (email) => {
    setEmail(email)
  }
  return (
    <div>
        <Header/>
        <Routes>
        <Route path="/"  element={<SignupForm/>}/>
        <Route path="/Login"  element={<Login onGetEmail={getEmail} />}/>
        <Route path="/Profile" element={<Profile email={email}/>}/>
        <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
        <Route path="/ExpenseForm" element={<ExpenseForm />}/>
        </Routes>
    </div>
  );
}

export default App;
