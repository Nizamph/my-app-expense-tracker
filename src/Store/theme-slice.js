import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name:"theme",
  initialState:{theme:"none"},
  reducers: {
    changeTheme:(state) => {
       state.theme = "theme"
    },
    unchangeTheme:(state) => {
      state.theme = "none"
    }
    
  }
})

export const themeAction = themeSlice.actions

export default themeSlice.reducer