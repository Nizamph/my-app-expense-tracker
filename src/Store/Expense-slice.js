import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'Expenses',
  initialState: { value: [], totalAmount: 0 },
  reducers: {
    fetchexpenses: (state, action) => {
      state.value = action.payload;
    },
    addExpense: (state, action) => {
      console.log('state value before', state.value);
      state.value = [...state.value, action.payload];
      console.log('state value after', state.value);
    },
    deleteExpense: (state, action) => {
      state.value = state.value.filter(
        (item) => item.localId !== action.payload.localId
      );
    },
    editExpense: (state, action) => {
      state.value.map((item) => {
        if (item.localId === action.payload.localId)
          return (
            (item.amount = action.payload.amount),
            (item.description = action.payload.description),
            (item.category = action.payload.category)
          );
      });
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
