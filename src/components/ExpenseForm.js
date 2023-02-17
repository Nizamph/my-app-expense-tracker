import React, { useState } from 'react'
import styles from './Expense.module.css'
import ExpenseList from './ExpenseList'
import { useRef } from 'react'
const ExpenseForm = () => {
  const expenseInputRef = useRef();
  const desciptionInputRef = useRef();
  const categoryInputRef = useRef();
  
  const[expense,setExpense] = useState([])
  const expenseSubmitHandler = (event) => {
    const enteredExpense = expenseInputRef.current.value;
    const enteredDescription = desciptionInputRef.current.value;
    const selectedCategory = categoryInputRef.current.value;
    console.log(enteredDescription,enteredExpense,selectedCategory)
      event.preventDefault()
      setExpense((prevState) => {
        return [...prevState,{amount:enteredExpense,description:enteredDescription,category:selectedCategory,id:Math.random().toString()}]
      })
  }
  console.log(expense)
  return (
    <React.Fragment>
<div className="container shadow p-4">
  <form className="row g-3" onSubmit={expenseSubmitHandler}>
    <div className="col-md-4">
      <label  className="form-label">Expense</label>
      <input type="text" className="form-control" placeholder="Enter expense" ref={expenseInputRef}/>
    </div>
    <div className="col-md-4">
      <label  className="form-label">Description</label>
      <input type="text" className="form-control"  placeholder="Enter description" ref={desciptionInputRef}/>
    </div>
    <div className="col-md-4">
      <label  className="form-label">Category</label>
      <select className="form-select" id="categoryInput" ref={categoryInputRef}>
        <option value="petrol">Petrol</option>
        <option value="room rent">Room Rent</option>
        <option value="entertainment">Entertainment</option>
        <option value="food">Food</option>
      </select>
    </div>
    <div className="col-12">
      <button type="submit" className="btn btn-primary">Submit</button>
    </div>
  </form>
</div>
    <ExpenseList expenseList={expense}/>
    </React.Fragment>
  )
}

export default ExpenseForm