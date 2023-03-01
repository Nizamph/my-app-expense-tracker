import { Button } from 'react-bootstrap';
import React, { useState,useRef, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import styles from "./Expense.module.css"
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { expenseActions } from '../Store/Expense-slice';
const ExpenseList = (props) => {
   const [editItemId, setEditItemId] = useState(null);
   const [editAmount, setEditAmount] = useState("");
   const [editDescription, setEditDescription] = useState("");
   const [editCategory, setEditCategory] = useState("");
  console.log(editAmount)
  const expenseData = useSelector(state => state.expense.value)

   const isEdit = useSelector(state => state.expense.isEdit)

  console.log('from expense data ',expenseData)
  const dispatch = useDispatch()

   const deleteHandler = (item) => {
      console.log('deleting id',item.localId)
      dispatch(expenseActions.deleteExpense({localId:item.localId}))
      axios.delete(`https://expense-tracker-c0524-default-rtdb.firebaseio.com/expenses/${item.id}.json`).then((res) => {
         console.log('from delete',res)
      }).catch((err) => {
         console.log(err)
      })
   }
    

   const editHandler = (item) => {
      setEditItemId(item.localId);
      setEditAmount(item.amount);
      setEditDescription(item.description);
      setEditCategory(item.category);
      dispatch(expenseActions.editExpense({localId:item.localId}))
   }



   const updateHandler = (item) => {
      
      const updatedItem = {
         ...item,
         amount: editAmount,
         description: editDescription,
         category: editCategory
      };
      dispatch(expenseActions.editExpense(updatedItem))
      // let updatedExpenseArray = []
      // updatedExpenseArray.push(updatedItem)
      // props.onUpdate(updatedExpenseArray);
       setEditItemId(null)
      axios.put(`https://expense-tracker-c0524-default-rtdb.firebaseio.com/expenses/${item.id}.json`, updatedItem)
         .then((res) => {
            console.log(res)
         }).catch((err) => {
            console.log(err)
         })
   }
   let amount = 0
   expenseData?.forEach((element) => {
      amount += Number(element.amount)
   })

   return (
      <Card className={styles.expenses}>
         <Card.Title className='m-auto pt-3 border-bottom  pb-3'>Expense Details</Card.Title>
         <ul>
            {expenseData.map(item => (
               <li key={item.id}>
                  <div className={styles.expenseItem}>
                     <div className={styles.div}><b>Expense:&nbsp;&nbsp;</b>
                        {editItemId === item.localId ?
                           <input type="text" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} /> :
                           item.amount
                        }
                     </div> 
                     <div className={styles.div}><b>Description:&nbsp;&nbsp;</b>
                        {editItemId === item.localId ?
                           <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} /> :
                           item.description
                        }
                     </div>
                     <div className={styles.div}><b>Category:&nbsp;&nbsp;</b>
                        {editItemId === item.localId ?
                           <input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} /> :
                           item.category
                        }
                     </div>
                     {console.log(item.localId,'from div')}
                     {editItemId === item.localId ?
                        <Button onClick={() => updateHandler(item)} variant='success' className='sm ms-3'>Update</Button> :
                        <Button onClick={() => editHandler(item)} variant='info' className='sm ms-3'>Edit</Button>
                     }
                     <Button onClick={() => deleteHandler(item)} variant='danger' className='sm ms-3 my-auto'>Delete</Button>
                  </div> 
               </li>  
            ))}
         </ul>
         <h3 style={{textAlign:"center"}}>Total: Rs.{amount}</h3>
    </Card>
    
  )

}

export default ExpenseList;