import { createSlice } from "@reduxjs/toolkit";
const modalSlice = createSlice({
  name:"modal",
  initialState:{onShow:false},
  reducers:{
    Show:(state) => {
      console.log('show from redux')
     state.onShow = true
    },
    onClose:(state) => {
     state.onShow = false
    },
  }
})

export const actionsModal = modalSlice.actions

export default modalSlice.reducer