const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');
const { startStandaloneServer } = require('@apollo/server/standalone');
const uuid = require('uuid');
const mongoose = require('mongoose');
require('dotenv').config();
const Author = require('./model/author');
const Book = require('./model/book');

MONGO_PWD = process.env.MONGO_PWD;
MONGODB_URI = `mongodb+srv://tejeshreddy111:${MONGO_PWD}@cluster0.y8ge51l.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Rest of your code
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const typeDefs = `
  type Query {
    authorCount: Int,
    bookCount: Int,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author]
  },
  type User {
    username: String!,
    favoriteGenre: String!
    id: ID!
  },
  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String]!
    ): Book,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author,
    createUser(
      username: String!,
      favoriteGenre: String!,
    ): User,
    login(
      username: username
    )
  },
  type Book {
    title: String,
    published: Int,
    author: Author,
    genres: [String]
  },
  type Author {
    name: String,
    bookCount: Int,
    born: Int
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });
        if (foundAuthor) {
          if (args.genre) {
            return await Book.find({
              author: foundAuthor.id,
              genres: { $in: [args.genre] },
            }).populate('author');
          }
          return await Book.find({ author: foundAuthor });
        }
      }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author');
      }
      return Book.find({}).populate('author');
    },
    allAuthors: async () => {
      await Author.find({});
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let findAuthor = await Author.findOne({ name: args.author });
      const foundBook = await Book.findOne({ title: args.title });

      if (foundBook) {
        throw new GraphQLError('Book is already present', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      if (!findAuthor) {
        const author = new Author({ name: args.author, born: 1000 });
        try {
          await author.save();
        } catch {
          throw new GraphQLError('Invalid Author Input', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }
      }

      foundAuthor = await Author.findOne({ name: args.author });

      const book = new Book({ ...args, author: foundAuthor._id });

      try {
        await book.save();
      } catch {
        throw new GraphQLError('Invalid Book Input', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      return book;
    },
    editAuthor: async (root, args) => {
      let authorToUpdate = await Author.findOne({ name: args.name });

      if (authorToUpdate) {
        authorToUpdate.born = args.setBornTo;

        try {
          await authorToUpdate.save();
        } catch {
          throw new GraphQLError('Failed to update author', {
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
            },
          });
        }
        return authorToUpdate;
      }
      return null;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
