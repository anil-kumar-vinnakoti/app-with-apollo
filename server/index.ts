import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import http from "http";
import { prismaClient } from "./src/clients/db.js";
import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "apollo-app-unique-identifier",
  issuerBaseURL: "https://dev-lokpkdwjbb1xoaby.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

const app = express();
const httpServer = http.createServer(app);
const corsOptions = {
  origin: [
    "http://localhost:3000",
    // "https://studio.apollographql.com",
  ],
  allowedHeaders: ["Authorization", "Content-Type"],
};

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Author{
    id:Int!
    name: String!
    books:[Book!]!
  }
  type Book{
    id: Int!
    title: String!
    authorId: Int!
    author: Author
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    authors: [Author]
    books:[Book]
  }

  type Mutation {
    addAuthor(name: String!): Author
    addBook(title: String!, authorId:Int!): Book
  }
  
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Author: {
      books: async (parent) => {
        const books = await prismaClient.book.findMany();
        return books.filter((book) => book.authorId === parent.id);
      },
    },
    Book: {
      author: async (parent) => {
        const authors = await prismaClient.author.findMany();
        return authors.find((author) => author.id === parent.authorId);
      },
    },
    Query: {
      authors: async () => await prismaClient.author.findMany(),
      books: async () => (await prismaClient.book.findMany()) || [],
    },
    Mutation: {
      addAuthor: async (parent, args) => {
        try {
          const newAuthor = prismaClient.author.create({
            data: { name: args.name },
          });
          return newAuthor;
        } catch (error) {}
      },
      addBook: async (parent, args) => {
        try {
          const newBook = await prismaClient.book.create({
            data: {
              title: args.title,
              authorId: args.authorId,
            },
          });
          return newBook;
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
});

await server.start();

// [TODO] Fix 401 for GraphQL studio
// enforce on all endpoints
app.use(cors(corsOptions), jwtCheck);

app.use(
  "/graphql",
  cors<cors.CorsRequest>(corsOptions),
  express.json(),
  expressMiddleware(server)
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
