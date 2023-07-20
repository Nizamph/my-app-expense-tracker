import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: false },
  reducers: {
    changeTheme: (state) => {
      state.theme = !state.theme;
      console.log('theme calling');
    },
  },
});

export const themeAction = themeSlice.actions;

export default themeSlice.reducer;
