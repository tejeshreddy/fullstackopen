import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    list: [],
  },
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: Date.now(),
        text: action.payload,
      };

      state.list.push(newNote);
    },
  },
});

export const { addNote } = notesSlice.actions;
export default notesSlice.reducer;
