import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import axios from 'axios';
import { getAnecdotes, putAnecdote } from '../request';

const App = () => {
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
  };

  if (anecdotes.isLoading) {
    return <div>is Loading</div>;
  } else {
    return (
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
    );
  }
};

export default App;
