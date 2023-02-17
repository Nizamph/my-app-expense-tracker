import React from 'react';
import { Card } from 'react-bootstrap';
import styles from "./Expense.module.css"

const ExpenseList = (props) => {
    console.log(props.expenseList)
  return (
    <Card className={styles.expenses}>
       <Card.Title className='m-auto pt-3 border-bottom  pb-3'>Expense Details</Card.Title>
        <ul>
          {props.expenseList.map( item => (
           
            <li key={item.id}>
              <div className={styles.expenseItem}>
              <p><b>Expense:&nbsp;&nbsp;</b>{item.amount}</p> 
              <p><b>Description:&nbsp;&nbsp;</b>{item.description}</p>
              <p><b>Category:&nbsp;&nbsp;</b>{item.category}</p>
              </div> 
            </li>
          ))}
        </ul>
    </Card>
    
  )

}

export default ExpenseList;