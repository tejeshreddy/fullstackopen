import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import axios from 'axios';
import { getAnecdotes, putAnecdote } from '../request';
import { useReducer } from 'react';
import NotificationContext from './components/NotificationContext';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    default:
      return state;
  }
};

const App = () => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );

  const queryClient = useQueryClient();

  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const newVoteIncreaseMutation = new useMutation({
    mutationFn: putAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const handleVote = (anecdote) => {
    newVoteIncreaseMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `Vote has been increased for - ${anecdote.content}`,
    });
  };

  if (anecdotes.isLoading) {
    return <div>is Loading</div>;
  } else {
    return (
      <NotificationContext.Provider
        value={[notification, notificationDispatch]}
      >
        <div>
          <h3>Anecdote app</h3>

          <Notification />
          <AnecdoteForm />

          {anecdotes.data.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
        </div>
      </NotificationContext.Provider>
    );
  }
};

export default App;
