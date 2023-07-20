import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth-slice';
import { NavLink } from 'react-router-dom';
import { actionsModal } from '../../Store/Modal-Slice';
import PremiumModal from './PremiumModal';

function Header() {
  // const AuthCtx = useContext(AuthContext)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate('/', { replace: true });
  };
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const idToken = useSelector(state => state.auth.idToken)

  // console.log('token from header',idToken)

  const expenses = useSelector((state) => state.expense.value);

  const showModal = useSelector((state) => state.modal.onShow);

  let amount = 0;
  expenses?.forEach((item) => {
    amount += Number(item.amount);
  });

  console.log('expenses from', expenses);
  console.log(' amount from header', amount);

  const onModalshowHandler = (e) => {
    e.preventDefault();
    // console.log('modal show')
    dispatch(actionsModal.Show());
  };

  const ModalHideHandler = (event) => {
    event.preventDefault();
    dispatch(actionsModal.onClose());
  };

  // console.log('show modal',showModal)

  return (
    <React.Fragment>
      <Navbar
        bg='dark'
        fixed='top'
        className='p-3 text-light'
        expand='lg'>
        <Container fluid>
          <Navbar.Brand
            href='#'
            className=' text-light text-decoration-none'>
            Expense Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px', textDecoration: 'none' }}
              navbarScroll>
              <NavLink
                to='/Home'
                className='text-light text-decoration-none ms-4'
                activeClassName='active'>
                Home
              </NavLink>
              {!isLoggedIn && (
                <NavLink
                  to='/'
                  className='text-light text-decoration-none ms-4'
                  activeClassName='active'>
                  Login
                </NavLink>
              )}
              {isLoggedIn && (
                <NavLink
                  to='/Profile'
                  className='text-light text-decoration-none ms-4'
                  activeClassName='active'>
                  My Profile
                </NavLink>
              )}
              {isLoggedIn && (
                <NavLink
                  to='/ExpenseForm'
                  className='text-light text-decoration-none ms-4'
                  activeClassName='active'>
                  My Expenses
                </NavLink>
              )}
            </Nav>
            <Form className='d-flex'>
              {isLoggedIn && amount >= Number(10000) ? (
                <Button
                  variant='info'
                  className='me-4'
                  onClick={onModalshowHandler}>
                  Premium
                </Button>
              ) : null}
              {isLoggedIn && (
                <Button
                  variant='outline-light'
                  onClick={logoutHandler}>
                  logout
                </Button>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
        <style>
          {`
          .active {
            font-weight: bold;
          }
        `}
        </style>
      </Navbar>
      <PremiumModal
        onShow={showModal}
        onClose={ModalHideHandler}
      />
    </React.Fragment>
  );
}

export default Header;
