import { useState } from "react";
import { Fragment } from "react";
import { Book, useGetBooksQuery } from "../../gql/types";
import BookCard from "./BookCard";
import { Button } from "antd";
import AddBook from "./AddBook";

export default function Books() {
  const { data, loading, error } = useGetBooksQuery();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editBookDetails, setEditBookDetails] = useState<Book | undefined>();

  if (error) {
    console.log(error);
    return null;
  }

  const handleEditOrAddBook = ({
    mode,
    editBookDetails,
  }: {
    mode: string;
    editBookDetails?: Book;
  }) => {
    if (mode === "ADD") {
      console.log(mode, editBookDetails);
      setIsModalOpen(true);
      setEditBookDetails(undefined);
    } else if (mode === "EDIT") {
      console.log(mode, editBookDetails);
      setEditBookDetails(editBookDetails);
      setIsModalOpen(true);
    }
    return undefined;
  };

  // console.log("loading", loading); [TODO] use this for loading grapihc

  return (
    <div>
      <div className="mt-3 text-right">
        <Button
          className="rounded-full text-white bg-black px-4 py-2 text-xs"
          onClick={() =>
            handleEditOrAddBook({ mode: "ADD", editBookDetails: undefined })
          }
        >
          Add Book
        </Button>
      </div>
      <div className="container mx-auto flex flex-wrap justify-center">
        {data?.books?.map((book: any) => (
          <Fragment key={book?.id}>
            <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 flex justify-center">
              <BookCard
                book={book}
                isLoading={loading}
                handleEditOrAddBook={handleEditOrAddBook}
              />
            </div>
          </Fragment>
        ))}

        <AddBook
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editBookDetails={editBookDetails}
          mode={editBookDetails?.id ? "EDIT" : "ADD"}
        />
      </div>
    </div>
  );
}
