import SignupForm from "./Authentication/SignupForm";
import { Route,Routes } from 'react-router-dom'
import Login from "./Authentication/Login";
import ExpenseTracker from "./components/ExpenseTracker";
function App() {
  return (
    <div>
        <Routes>
        <Route path="/"  element={<SignupForm/>}/>
        <Route path="/Login"  element={<Login/>}/>
        <Route path="/ExpenseTracker" element={<ExpenseTracker/>}/>
        </Routes>
    </div>
  );
}

export default App;
