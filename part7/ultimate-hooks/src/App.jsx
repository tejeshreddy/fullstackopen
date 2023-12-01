import { useEffect, useState } from 'react';

import { useResource } from './hooks/useResource';
import Notification from './Notification';
import { setMessage } from './slices/notificationSlice';
import { useDispatch } from 'react-redux';

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

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  useEffect(() => {
    noteService.get();
    personService.get();
  }, []);

  const handleNoteSubmit = async (event) => {
    event.preventDefault();
    await noteService.create({ content: content.value });
    await noteService.get();
    dispatch(setMessage('note pushed'));
  };

  const handlePersonSubmit = async (event) => {
    event.preventDefault();
    await personService.create({ name: name.value, number: number.value });
    await personService.get();
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
        <p key={n.id}>{n.content}</p>
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
