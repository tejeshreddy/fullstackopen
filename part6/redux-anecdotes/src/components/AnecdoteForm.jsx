import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationSlice';
import { addAnecdote } from '../reducers/anecdoteSlice';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecdote = (event) => {
    event.preventDefault();

    dispatch(addAnecdote(event.target.anecdote.value));

    dispatch(
      setNotification('Anecdote added - ' + event.target.anecdote.value)
    );

    setTimeout(() => {
      dispatch(setNotification(''));
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
