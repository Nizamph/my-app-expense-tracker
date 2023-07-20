import React, { useEffect } from 'react';
import ExpenseList from './ExpenseList';
import { useRef } from 'react';
import axios from 'axios';
import { expenseActions } from '../Store/Expense-slice';
import { useDispatch, useSelector } from 'react-redux';
const ExpenseForm = (props) => {
  const dispatch = useDispatch();
  let expenseInputRef = useRef();
  let desciptionInputRef = useRef();
  let categoryInputRef = useRef();
  const email = useSelector((state) => state.auth.email);
  let cleanEmail = email.replace(/[^a-zA-Z0-9]/g, '');
  const expenseSubmitHandler = (event) => {
    event.preventDefault();
    let expenseId = Math.random().toString();
    const enteredExpense = expenseInputRef.current.value;
    const enteredDescription = desciptionInputRef.current.value;
    const selectedCategory = categoryInputRef.current.value;
    const postData = {
      amount: enteredExpense,
      description: enteredDescription,
      category: selectedCategory,
      localId: expenseId,
    };

    expenseInputRef.current.value = '';
    desciptionInputRef.current.value = '';
    categoryInputRef.current.value = '';

    axios
      .post(
        `https://expense-tracker-c0524-default-rtdb.firebaseio.com/${cleanEmail}/expense.json`,
        postData
      )
      .then((res) => {
        let newId = res.data.name;
        console.log(newId);
        dispatch(
          expenseActions.addExpense({
            id: newId,
            amount: enteredExpense,
            description: enteredDescription,
            category: selectedCategory,
            localId: expenseId,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://expense-tracker-c0524-default-rtdb.firebaseio.com/${cleanEmail}/expense.json`
      )
      .then((res) => {
        const data = res.data;
        console.log(data, 'data is here');
        let loadedExpenses = [];
        for (const key in data) {
          loadedExpenses.push({
            id: key,
            amount: data[key].amount,
            category: data[key].category,
            description: data[key].description,
            localId: data[key].localId,
          });
        }
        console.log('data inside array', loadedExpenses);
        dispatch(expenseActions.fetchexpenses(loadedExpenses));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <div
        className='container shadow p-4'
        style={{ marginTop: '90px' }}>
        <form
          className='row g-3'
          onSubmit={expenseSubmitHandler}>
          <div className='col-md-4'>
            <label className='form-label'>Expense</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter expense'
              ref={expenseInputRef}
              required
            />
          </div>
          <div className='col-md-4'>
            <label className='form-label'>Description</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter description'
              ref={desciptionInputRef}
            />
          </div>
          <div className='col-md-4'>
            <label className='form-label'>Category</label>
            <select
              className='form-select'
              id='categoryInput'
              ref={categoryInputRef}>
              <option value='petrol'>Petrol</option>
              <option value='room rent'>Room Rent</option>
              <option value='entertainment'>Entertainment</option>
              <option value='food'>Food</option>
            </select>
          </div>
          <div className='col-12'>
            <button
              type='submit'
              className='btn btn-dark'>
              Add expense
            </button>
          </div>
        </form>
      </div>
      <ExpenseList />
    </React.Fragment>
  );
};

export default ExpenseForm;
