import { useEffect, useState } from 'react';
import Notification from './Notification';
import { setMessage } from './slices/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, increaseVote, initializeNotes } from './slices/noteSlice';
import { createPerson, initializePersons } from './slices/personSlice';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const App = () => {
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.list);
  const persons = useSelector((state) => state.persons.list);

  useEffect(() => {
    dispatch(initializeNotes());
    dispatch(initializePersons());
  }, [dispatch]);

  const handleNoteSubmit = async (event) => {
    event.preventDefault();
    dispatch(createNote(content.value));
    // await noteService.create({ content: content.value, id: uuidv4() });
    // await noteService.get();
    dispatch(setMessage('note pushed'));
  };

  const handlePersonSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      createPerson({
        name: name.value,
        number: number.value,
      })
    );
    dispatch(setMessage('person pushed'));
  };

  return (
    <div>
      <Notification />
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>
          {n.content} - {n.likes}
          <button
            type="button"
            onClick={() => dispatch(increaseVote(n))}
            key={n.id}
          >
            Like
          </button>
        </p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
