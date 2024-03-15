import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import books from "./src/data/booksData.json" assert { type: "json" };
import authors from "./src/data/authorsData.json" assert { type: "json" };

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id:Int!
    title: String!
    author: Author!
  }

  type Author{
    id:Int!
    name: String!
    books:[Book!]!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book],
    authors: [Author]
  }

  type Mutation {
    addBook(title: String!, author: String!): [Book]
  }
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Book: {
      author: (parent) =>
        authors.find((author) => author.name === parent.author),
    },
    Author: {
      books: (parent) => books.filter((book) => book.author === parent.name),
    },
    Query: {
      books: () => books,
      authors: () => authors,
    },
    Mutation: {
      addBook: (parent, args) => {
        const { title, author } = args;
        books.push({ id: books.length + 1, title, author });
        return books;
      },
    },
  },
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
