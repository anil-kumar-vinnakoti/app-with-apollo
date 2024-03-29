import { useState } from "react";
import { Book, useGetBooksQuery } from "../../gql/types";
import BookCard from "./BookCard";
import { Button } from "antd";
import AddOrEditBook from "./AddOrEditBook";
import Spinner from "../utils/Spinner";

export default function Books() {
  const { data, loading, error } = useGetBooksQuery();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editBookDetails, setEditBookDetails] = useState<Book | undefined>();

  if (loading) {
    return <Spinner />;
  }

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
      setIsModalOpen(true);
      setEditBookDetails(undefined);
    } else if (mode === "EDIT") {
      setEditBookDetails(editBookDetails);
      setIsModalOpen(true);
    }
    return undefined;
  };

  // console.log("loading", loading);
  // [TODO] use this for loading grapihc

  return (
    <div>
      <Button
        className="rounded-full text-white bg-black px-5 py-2 text-xs leading-3 float-end w-full"
        onClick={() =>
          handleEditOrAddBook({ mode: "ADD", editBookDetails: undefined })
        }
      >
        Add Book
      </Button>
      <div className="container mx-auto flex flex-wrap justify-center">
        {data?.books?.map((book: any) => (
          <div
            key={book.id}
            className="basis-1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 mb-4 flex justify-center"
          >
            <BookCard
              book={book}
              isLoading={loading}
              handleEditOrAddBook={handleEditOrAddBook}
            />
          </div>
        ))}

        <AddOrEditBook
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editBookDetails={editBookDetails}
          mode={editBookDetails?.id ? "EDIT" : "ADD"}
        />
      </div>
    </div>
  );
}
