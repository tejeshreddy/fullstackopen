import { gql, useQuery } from '@apollo/client';

const ALL_BOOKS = gql`
  query Query {
    allBooks {
      title
      published
      author
    }
  }
`;

const Books = (props) => {
  const books = useQuery(ALL_BOOKS);
  console.log(books.data.allBooks);
  if (!props.show) {
    return null;
  }

  return books.loading ? (
    <>is loading....</>
  ) : (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
