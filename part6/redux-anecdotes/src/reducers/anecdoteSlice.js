import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const newObject = (anecdote) => {
  return {
    content: anecdote || '',
    id: generateId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // increaseVoteCountByOne(state, action) {
    //   const id = action.payload;
    //   const anecdote = state.find((a) => a.id === id);
    //   const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    //   return state.map((a) => (a.id !== id ? a : updatedAnecdote));
    // },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = (anecdoteContent) => {
  console.log(anecdoteContent);
  return async (dispatch) => {
    const anecdote = newObject(anecdoteContent);
    const newAnecdote = await anecdoteService.pushAnecdote(anecdote);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const increaseVoteCountByOne = (anecdoteId) => {
  return async (dispatch, getState) => {
    const state = getState();
    let anecdote = state.anecdotes.find((a) => a.id === anecdoteId);
    anecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.putAnecdote(anecdote);
    dispatch(
      setAnecdotes(
        state.anecdotes.map((a) => (a.id !== anecdoteId ? a : updatedAnecdote))
      )
    );
  };
};

export default anecdoteSlice.reducer;
