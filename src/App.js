import SignupForm from "./Authentication/SignupForm";
import { Route,Routes } from 'react-router-dom'
import Login from "./Authentication/Login";
import ExpenseTracker from "./components/ExpenseTracker";
import Profile from "./components/Profile";
function App() {
  return (
    <div>
        <Routes>
        <Route path="/"  element={<SignupForm/>}/>
        <Route path="/Login"  element={<Login/>}/>
        <Route path="/ExpenseTracker" element={<ExpenseTracker/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        </Routes>
    </div>
  );
}

export default App;
