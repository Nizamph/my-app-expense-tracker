import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth-slice';
import expenseReducer from './Expense-slice'
import modalReducer from './Modal-Slice'
import themeReducer from './theme-slice'

const store = configureStore({
  reducer: {auth:authReducer, expense:expenseReducer, modal:modalReducer, theme:themeReducer}
})


export default store;