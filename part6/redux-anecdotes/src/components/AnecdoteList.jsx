import { useSelector, useDispatch } from 'react-redux';
import { increaseVoteCountByOne } from '../reducers/anecdoteSlice';
import { setNotification } from '../reducers/notificationSlice';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const anecdotes = state.anecdotes;
    const filter = state.filter;
    if (filter === '') {
      return anecdotes;
    } else {
      return anecdotes.filter((a) =>
        a.content.toLowerCase().includes(filter.toLowerCase())
      );
    }
  });

  const increaseVote = (anecdote) => {
    dispatch(increaseVoteCountByOne(anecdote.id));

    dispatch(setNotification('Vote count increased for ' + anecdote.content));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, 5000);
  };

  const dispatch = useDispatch();

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content} - {anecdote.votes} votes
            <div>
              <button onClick={() => increaseVote(anecdote)}>vote</button>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
