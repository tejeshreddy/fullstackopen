import PropTypes from 'prop-types';

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>Anecdote</h2>
      <ul>
        <li>{anecdote.content}</li>
      </ul>
    </div>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default Anecdote;
