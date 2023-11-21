import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAnecdotes } from '../../request';
import { useContext } from 'react';
import NotificationContext from './NotificationContext';

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const newObj = (anecdoteContent) => {
  return { content: anecdoteContent, id: generateId(), votes: 0 };
};

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const newMutation = useMutation({
    mutationFn: postAnecdotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
    onError: () => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `too short anecdote much be at least 5 characters long`,
      });
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newMutation.mutate(newObj(content));
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
