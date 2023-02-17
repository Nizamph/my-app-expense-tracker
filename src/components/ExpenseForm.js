import React, { useEffect, useState } from 'react'
import styles from './Expense.module.css'
import ExpenseList from './ExpenseList'
import { useRef } from 'react'
import axios from 'axios'
import { json } from 'react-router-dom'
const ExpenseForm = () => {
  const expenseInputRef = useRef();
  const desciptionInputRef = useRef();
  const categoryInputRef = useRef();
  
  const[expense,setExpense] = useState([])
  
  const expenseSubmitHandler = (event) => {
    event.preventDefault()
    const enteredExpense = expenseInputRef.current.value;
    const enteredDescription = desciptionInputRef.current.value;
    const selectedCategory = categoryInputRef.current.value;
    const postData = {
      amount:enteredExpense,
      description:enteredDescription,
      category:selectedCategory,
      id:Math.random().toString()
    }
    axios.post("https://expense-tracker-c0524-default-rtdb.firebaseio.com/expenses.json",postData)
    .then((res) => {
      console.log(res)
      setExpense((prevState) => {
        return [...prevState,{amount:enteredExpense,description:enteredDescription,category:selectedCategory,id:Math.random().toString()}]
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    axios.get("https://expense-tracker-c0524-default-rtdb.firebaseio.com/expenses.json")
    .then((res) => {
      console.log(res.data)
       setExpense(Object.values(res.data))
    }).catch((err) => {
      console.log(err)
    }) 
  },[])
  return (
    <React.Fragment>
<div className="container shadow p-4">
  <form className="row g-3" onSubmit={expenseSubmitHandler}>
    <div className="col-md-4">
      <label  className="form-label">Expense</label>
      <input type="text" className="form-control" placeholder="Enter expense" ref={expenseInputRef} required/>
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