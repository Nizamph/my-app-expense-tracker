import SignupForm from "./Authentication/SignupForm";
import { Route,Routes } from 'react-router-dom'
import Login from "./Authentication/Login";
import Profile from "./components/Profile";
import ForgetPassword from "./Authentication/ForgetPassword";
import ExpenseTrackerWelcome from "./components/ExpenseTrackerWelcomePage";
import ExpenseForm from "./components/ExpenseForm";
function App() {
  return (
    <div>
        <Routes>
        <Route path="/"  element={<SignupForm/>}/>
        <Route path="/Login"  element={<Login/>}/>
        <Route path="/ExpenseTrackerWelcome" element={<ExpenseTrackerWelcome/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
        <Route path="/ExpenseForm" element={<ExpenseForm/>}/>
        </Routes>
    </div>
  );
}

export default App;
