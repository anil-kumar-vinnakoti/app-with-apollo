import { Fragment } from "react";
import { useAddBookMutation, useGetBooksQuery } from "../gql/types";
import GET_BOOKS from "../graphql/GetBooks.gql";

export default function Books() {
  const [addBook] = useAddBookMutation();
  const { data, loading, error } = useGetBooksQuery();

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
          {data?.books?.map((book) => (
            <Fragment key={book?.id}>
              <tr>
                <td className="border border-slate-700 p-4">{book?.title}</td>
                <td className="border border-slate-700 p-4">
                  {book?.author?.name}
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
          onClick={() =>
            addBook({
              variables: {
                title: "Na sav nen sastha neekendhuku",
                authorId: 1,
              },
              refetchQueries: [{ query: GET_BOOKS }],
            })
          }
        >
          Add Book
        </button>
      </div>
    </div>
  );
}
