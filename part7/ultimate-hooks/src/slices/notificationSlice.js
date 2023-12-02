import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    messages: '',
  },
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload;
    },
    clearMessage: (state) => {
      state.messages = '';
    },
  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
