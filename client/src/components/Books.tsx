import { Fragment } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

interface Book {
  id: number;
  title: string;
  authorId: number;
  author: Author;
}
interface Author {
  id: number;
  name: string;
  books: Book[];
}
export default function Books() {
  const GET_BOOKS = gql`
    query Query {
      books {
        id
        title
        authorId
        author {
          id
          name
        }
      }
    }
  `;

  const ADD_BOOK = gql`
    mutation addBook($title: String!, $authorId: Int!) {
      addBook(title: $title, authorId: $authorId) {
        title
        authorId
      }
    }
  `;

  const [addBook] = useMutation(ADD_BOOK, {
    variables: { title: "Na sav nen sastha neekendhuku", author: "Koushik" },
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const { data, loading, error } = useQuery(GET_BOOKS);

  if (loading) {
    return <h1>Loading....</h1>;
  }
  if (error) {
    console.log(error);
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <table className="table-fixed border-collapse border border-slate-500 ...">
        <thead>
          <tr>
            <th className="border border-slate-600 bg-gray-200 p-2">
              Book Title
            </th>
            <th className="border border-slate-600 bg-gray-200 p-2">
              Author Name
            </th>
          </tr>
        </thead>
        <tbody>
          {data.books.map((book: Book) => (
            <Fragment key={book.id}>
              <tr>
                <td className="border border-slate-700 p-4">{book.title}</td>
                <td className="border border-slate-700 p-4">
                  {book.author.name}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
      <div className="mt-3">
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => addBook()}
        >
          Add Book
        </button>
      </div>
    </div>
  );
}
