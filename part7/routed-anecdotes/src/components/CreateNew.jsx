import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = (props) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate('/anecdotes');
  };

  const handleReset = (e) => {
    content.reset();
    author.reset();
    info.reset();
  };

  const filterProps = (obj, keysToExclude) =>
    Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keysToExclude.includes(key))
    );

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...filterProps(content, ['reset'])} />
        </div>
        <div>
          author
          <input {...filterProps(author, ['reset'])} />
        </div>
        <div>
          url for more info
          <input {...filterProps(info, ['reset'])} />
        </div>
        <button>create</button>
        <button type="button" onClick={() => handleReset()}>
          reset
        </button>
      </form>
    </div>
  );
};

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
};

export default CreateNew;
