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
  tokenSigningAlg: "RS256"
});

const app = express();

app.get("/", (_req, res) => res.sendStatus(200));
app.use(express.json({ limit: "10mb" }));

const httpServer = http.createServer(app);
const corsOptions = {
  origin: ["http://localhost:3000"],
  allowedHeaders: ["Authorization", "Content-Type"]
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
    updateAuthor(authorId:Int!, name:String!): Author
    deleteAuthor(authorId:Int!): String
    addBook(title: String!, authorId:Int!): Book
    deleteBook(bookId: Int!): String
    updateBook( authorId: Int!, bookId: Int!,title:String!,): Book
  }
  
`;

// The ApolloServer constructor requires two parameters: your schema definition and your set of resolvers.
const server = new ApolloServer({
  // use allowBatchedHttpRequests it when multiple httpRequests are needed to bed optimized on a single request
  // allowBatchedHttpRequests: true,

  typeDefs,
  resolvers: {
    Author: {
      books: async (parent) => {
        return await prismaClient.book.findMany({
          where: { authorId: parent.id }
        });
      }
    },
    Book: {
      author: async (parent) => {
        return await prismaClient.author.findFirst({
          where: { id: parent.authorId }
        });
      }
    },
    Query: {
      authors: async () => {
        return (await prismaClient.author.findMany()) || [];
      },
      books: async () => (await prismaClient.book.findMany()) || []
    },
    Mutation: {
      addAuthor: async (parent, args) => {
        try {
          const newAuthor = prismaClient.author.create({
            data: { name: args.name }
          });
          return newAuthor;
        } catch (error) {}
      },
      updateAuthor: async (paren, { authorId, name }) => {
        console.log(authorId, name);

        try {
          const updatedAuthor = await prismaClient.author.update({
            where: { id: authorId },
            data: {
              name
            }
          });
          return updatedAuthor;
        } catch (error) {
          console.log(error);
        }
      },
      deleteAuthor: async (parent, { authorId }) => {
        try {
          // // Get the author's books
          const books = await prismaClient.book.findMany({
            where: { authorId }
          });

          //  First delete the books associated with the author
          if (books.length) {
            await prismaClient.book.deleteMany({
              where: { authorId }
            });
          }

          // Now delete the author
          await prismaClient.author.delete({
            where: { id: authorId }
          });

          return "Author deleted successfully";
        } catch (error) {
          return new Error(error);
        }
      },
      addBook: async (parent, args) => {
        try {
          const newBook = await prismaClient.book.create({
            data: {
              title: args.title,
              authorId: args.authorId
            }
          });
          return newBook;
        } catch (error) {
          console.log(error);
        }
      },
      deleteBook: async (parent, { bookId }) => {
        try {
          await prismaClient.book.delete({
            where: { id: bookId }
          });
          return "Book deleted successfully";
        } catch (error) {
          console.error("Error deleting book:", error);
        }
      },
      updateBook: async (parent, { bookId, title, authorId }) => {
        try {
          const updatedBook = await prismaClient.book.update({
            where: { id: bookId },
            data: {
              title,
              authorId
            }
          });

          return updatedBook;
        } catch (error) {
          console.error("Error updating book:", error);
        }
      }
    }
  }
});

await server.start();

// [TODO] Fix 401 for GraphQL studio
// enforce on all endpoints

// app.use(cors(corsOptions), jwtCheck); [TODO] enabling this causing codegen Unauthorized issue for types in server. FIx it later. Hosting it somewhere will clears the problem

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
