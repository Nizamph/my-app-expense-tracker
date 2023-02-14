import React from 'react'
import styles from './ExpenseTracker.module.css'
import { Link } from 'react-router-dom'
const ExpenseTracker = () => {
  return (
    <div className={styles.header}> 
    <p style={{marginRight:"500px"}}>welcome to ExpenseTracker</p>
     <p className={styles.completeProf}>Your Profile is incomplete <Link to="/Profile" style={{color:"lightblue",textDecoration:"none"}}>complete it now</Link></p>
    </div>
  )
}

export default ExpenseTracker;