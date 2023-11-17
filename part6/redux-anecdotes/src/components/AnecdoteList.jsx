import { useSelector, useDispatch } from 'react-redux';
import { increaseVoteCountByOne } from '../reducers/anecdoteSlice';

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

  const dispatch = useDispatch();
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content} - {anecdote.votes} votes
            <div>
              <button
                onClick={() => dispatch(increaseVoteCountByOne(anecdote.id))}
              >
                vote
              </button>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
