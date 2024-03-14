import React, { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";

interface Book {
  title: string;
  author: string;
}
const Books = () => {
  const GET_BOOKS = gql`
    query GetBooks {
      books {
        title
        author
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_BOOKS);

  if (loading) {
    return <h1>Loading....</h1>;
  }
  if (error) {
    console.log(error);
    return null;
  }

  return (
    <Fragment>
      <table className="table-fixed border-collapse border border-slate-500 ...">
        <thead>
          <tr>
            <th className="border border-slate-600 bg-gray-200 p-2">Title</th>
            <th className="border border-slate-600 bg-gray-200 p-2">Author</th>
          </tr>
        </thead>
        <tbody>
          {data.books.map((book: Book) => (
            <Fragment key={book.title}>
              <tr>
                <td className="border border-slate-700 p-4">{book.title}</td>
                <td className="border border-slate-700 p-4">{book.author}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Books;
