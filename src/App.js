import SignupForm from './Authentication/SignupForm';
import { Route, Routes, redirect } from 'react-router-dom';
import Login from './Authentication/Login';
import Profile from './components/Profile';
import ForgetPassword from './Authentication/ForgetPassword';
import ExpenseForm from './components/ExpenseForm';
import Header from './components/UI/Header';
import { useNavigate } from 'react-router-dom';
import classes from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Home from './components/Home';
import { authActions } from './Store/auth-slice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showTheme = useSelector((state) => state.theme.theme);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  // const [email,setEmail] = useState('')
  // const getEmail = (email) => {
  //   setEmail(email)
  // }
  setTimeout(() => {
    dispatch(authActions.logout());
    navigate('/');
  }, 3000000);

  console.log('show theme from app', showTheme);
  return (
    <div className={showTheme ? classes.theme : ''}>
      <Header />
      <Routes>
        <Route
          path='/Signup'
          element={<SignupForm />}
        />
        <Route
          path='/Home'
          element={<Home />}
        />
        {!isLoggedIn && (
          <Route
            path='/'
            element={<Login />}
          />
        )}
        {isLoggedIn && (
          <Route
            path='/'
            element={<ExpenseForm />}
          />
        )}
        {isLoggedIn && (
          <Route
            path='/Profile'
            element={<Profile />}
          />
        )}
        <Route
          path='/ForgetPassword'
          element={<ForgetPassword />}
        />
        {isLoggedIn && (
          <Route
            path='/ExpenseForm'
            element={<ExpenseForm />}
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
