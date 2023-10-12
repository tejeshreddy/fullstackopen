import { useState } from 'react';
import './App.css';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  // let votes = Array.from({ length: anecdotes.length }, (_, index) => 0);

  const [selected, setSelected] = useState(0);
  // Alternate way to create a 0 fill array
  // const [votes, setVotes] = useState(
  //   Array.from({ length: anecdotes.length }, (_, index) => 0)
  // );
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const nextAnecdote = () => {
    const randomNumber = getRandomNumber(0, anecdotes.length - 1);
    setSelected(randomNumber);
  };
  const incrementVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
    console.log(votesCopy);
  };

  const findMaxValueIndex = (arr) => {
    if (arr.length === 0) {
      return 0;
    }
    let maxValue = arr[0];
    let maxIndex = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
        maxIndex = i;
      }
    }

    return maxIndex;
  };

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <div>{anecdotes[selected]}</div>
        <button onClick={nextAnecdote}>next anecdote</button>
        <button onClick={incrementVote}>vote</button>

        <h2>Anecdote with most votes</h2>
        <div>{anecdotes[findMaxValueIndex(votes)]}</div>
        <div>has {votes[findMaxValueIndex(votes)]} votes</div>
      </div>
    </div>
  );
};

export default App;
