import { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";

interface Author {
  id: number;
  name: string;
  books: object[];
}
export default function Authors() {
  const GET_AUTHORS = gql`
    query getAuthors {
      authors {
        id
        name
        books {
          title
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_AUTHORS);

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
              Author Id
            </th>
            <th className="border border-slate-600 bg-gray-200 p-2">Author</th>
          </tr>
        </thead>
        <tbody>
          {data.authors.map((author: Author) => (
            <Fragment key={author.id}>
              <tr>
                <td className="border border-slate-700 text-center">
                  {author.id}
                </td>
                <td className="border border-slate-700 p-4">{author.name}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
