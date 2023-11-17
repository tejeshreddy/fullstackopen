import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const newObject = (anecdote) => {
  return {
    content: anecdote || '',
    id: generateId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map((a) => newObject(a));

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      const newAnecdote = newObject(action.payload);
      state.push(newAnecdote);
      return state;
    },
    increaseVoteCountByOne(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((a) => (a.id !== id ? a : updatedAnecdote));
    },
  },
});

export const { addAnecdote, increaseVoteCountByOne } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
