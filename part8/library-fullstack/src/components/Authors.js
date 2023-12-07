import { gql, useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, UPDATE_BIRTH_YEAR } from '../graphql/queries';
import Select from 'react-select';
import { useState } from 'react';

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);
  const [selectedOption, setSelectedOption] = useState(null);
  const [year, setYear] = useState('');

  const [updateBirthYear] = useMutation(UPDATE_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_BOOKS }],
  });

  if (!props.show) {
    return null;
  }

  if (authors.loading) {
    return <>loading..</>;
  }

  const authorOptions = authors.data.allAuthors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  const handleUpdateYear = (event) => {
    event.preventDefault();
    const resp = updateBirthYear({
      variables: {
        name: selectedOption.value,
        setBornTo: Number(year),
      },
    });
    console.log(resp);
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birth year</h2>
      <form action="" onSubmit={handleUpdateYear}>
        <Select
          options={authorOptions}
          onChange={setSelectedOption}
          value={selectedOption}
        />
        <input
          value={year}
          type="text"
          onChange={(e) => setYear(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Authors;
