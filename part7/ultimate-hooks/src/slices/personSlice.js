import { createSlice } from '@reduxjs/toolkit';

const personSlice = createSlice({
  name: 'persons',
  initialState: {
    list: [],
  },
  reducers: {
    addPerson: (state, action) => {
      const newPerson = {
        id: Date.now(),
        name: action.payload.name,
        number: action.payload.number,
      };

      state.list.push(newPerson);
    },
  },
});

export const { addPerson } = personSlice.actions;
export default personSlice.reducer;
