import { Fragment } from "react";
import { useGetAuthorsQuery } from "../gql/types";

export default function Authors() {
  const { data, loading, error } = useGetAuthorsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Type guard to check if data is defined
  if (!data?.authors?.length) {
    return <p>No data available.</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <table className="table-fixed border-collapse border border-slate-500 ...">
        <thead>
          <tr>
            <th className="border border-slate-600 bg-gray-200 p-2">
              Author Name
            </th>
            <th className="border border-slate-600 bg-gray-200 p-2">
              Book Title
            </th>
          </tr>
        </thead>
        <tbody>
          {data.authors.map((author) => (
            <Fragment key={author?.id}>
              <tr>
                <td className="border border-slate-700 text-center">
                  {author?.name}
                </td>
                <td className="border border-slate-700 p-4">
                  {author?.books[0].title}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
