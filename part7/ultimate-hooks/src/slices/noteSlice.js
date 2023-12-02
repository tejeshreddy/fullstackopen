import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import backend from '../services/backend';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    list: [],
  },
  reducers: {
    addNote: (state, action) => {
      state.list.push(action.payload);
    },
    setNotes: (state, action) => {
      return { list: action.payload };
    },
  },
});

export const { addNote, setNotes } = notesSlice.actions;
export default notesSlice.reducer;

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = {
      id: uuidv4(), // Use UUID for a more random ID
      content: content,
    };
    await backend.createObject('http://localhost:3005/notes', newNote);
    dispatch(addNote(newNote));
  };
};

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await backend.getAll('http://localhost:3005/notes');
    dispatch(setNotes(notes));
  };
};
