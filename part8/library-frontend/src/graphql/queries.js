import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
  query Query {
    allBooks {
      title
      published
      author
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation Mutation(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      author
      genres
    }
  }
`;

export const ALL_AUTHORS = gql`
  query Query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`;

export const UPDATE_BIRTH_YEAR = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      born
      name
    }
  }
`;
