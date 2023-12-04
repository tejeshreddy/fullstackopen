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
    updateNote: (state, action) => {
      const id = action.payload.id;
      return {
        list: state.list.map((note) => (note.id != id ? note : action.payload)),
      };
    },
  },
});

export const { addNote, setNotes, updateNote } = notesSlice.actions;
export default notesSlice.reducer;

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = {
      id: uuidv4(),
      content: content,
      likes: 0,
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

export const increaseVote = (note) => {
  return async (dispatch) => {
    const updatedNote = await backend.updateObject(
      `http://localhost:3005/notes`,
      note.id,
      { ...note, likes: note.likes + 1 }
    );
    dispatch(updateNote(updatedNote));
  };
};
