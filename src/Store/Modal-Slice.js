import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
const modalSlice = createSlice({
  name: 'modal',
  initialState: { onShow: false, message: '' },
  reducers: {
    Show: (state) => {
      state.onShow = true;
    },
    onClose: (state) => {
      state.onShow = false;
    },
    errorMessage: (state, action) => {
      state.message = action.payload.message;
    },
  },
});

export const actionsModal = modalSlice.actions;

export default modalSlice.reducer;
