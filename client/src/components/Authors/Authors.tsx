import { useState } from "react";
import { Author, useGetAuthorsQuery } from "../../gql/types";
import AuthorCard from "./AuthorCard";
import { Button } from "antd";
import AddOrEditAuthor from "./AddOrEditAuthor";

export default function Authors() {
  const { data, loading, error } = useGetAuthorsQuery();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editAuthorDetails, setEditAuthorDetails] = useState<
    Author | undefined
  >();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Type guard to check if data is defined
  if (!data?.authors?.length) {
    return <p>No data available.</p>;
  }

  const handleEditOrAddAuthor = ({
    mode,
    editAuthorDetails,
  }: {
    mode: string;
    editAuthorDetails?: Author;
  }) => {
    if (mode === "ADD") {
      setIsModalOpen(true);
      setEditAuthorDetails(undefined);
    } else if (mode === "EDIT") {
      setEditAuthorDetails(editAuthorDetails);
      setIsModalOpen(true);
    }
    return undefined;
  };

  return (
    <div>
      <Button
        className="rounded-full text-white bg-black px-5 py-2 text-xs leading-3 float-end w-full hover:shadow-md"
        onClick={() =>
          handleEditOrAddAuthor({ mode: "ADD", editAuthorDetails: undefined })
        }
      >
        Add Author
      </Button>
      <div className="container mx-auto flex flex-wrap justify-center">
        {data.authors.map((author: any) => (
          <div
            key={author.id}
            className="basis-1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 mb-4 flex justify-center"
          >
            <AuthorCard
              author={author as Author}
              isLoading={loading}
              handleEditOrAddAuthor={handleEditOrAddAuthor}
            />
          </div>
        ))}
      </div>
      <AddOrEditAuthor
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editAuthorDetails={editAuthorDetails}
        mode={editAuthorDetails?.id ? "EDIT" : "ADD"}
      />
    </div>
  );
}
