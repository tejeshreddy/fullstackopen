import { createSlice } from '@reduxjs/toolkit';
import backend from '../services/backend';
import { v4 as uuidv4 } from 'uuid';

const personSlice = createSlice({
  name: 'persons',
  initialState: {
    list: [],
  },
  reducers: {
    addPerson: (state, action) => {
      const newPerson = {
        id: uuidv4(),
        name: action.payload.name,
        number: action.payload.number,
      };
      state.list.push(newPerson);
    },
    setPersons: (state, action) => {
      return { list: action.payload };
    },
  },
});

export const { addPerson, setPersons } = personSlice.actions;
export default personSlice.reducer;

export const initializePersons = () => {
  return async (dispatch) => {
    const persons = await backend.getAll('http://localhost:3005/persons');
    dispatch(setPersons(persons));
  };
};

export const createPerson = ({ name, number }) => {
  return async (dispatch) => {
    const newPerson = {
      id: Date.now(),
      name: name,
      number: number,
    };

    await backend.createObject('http://localhost:3005/persons', newPerson);
    dispatch(addPerson(newPerson));
  };
};
