import React from "react";
import { Card, Skeleton, Tooltip, Dropdown, MenuProps, Button } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import {
  Author,
  Book,
  GetAuthorsDocument,
  GetBooksDocument,
  useDeleteAuthorMutation,
} from "../../gql/types";
import { ApolloCache } from "@apollo/client";

const AuthorCard = ({
  author,
  isLoading,
  handleEditOrAddAuthor,
}: {
  author: Author;
  isLoading: boolean;
  handleEditOrAddAuthor: ({
    mode,
    editAuthorDetails,
  }: {
    mode: string;
    editAuthorDetails: Author;
  }) => undefined;
}) => {
  const authorTopRatedBooks = author.books.slice(0, 3);
  const [deleteAuthor, { error }] = useDeleteAuthorMutation();

  const gridStyle: React.CSSProperties = {
    width: "100%",
    padding: `${
      authorTopRatedBooks.length === (0 || 1)
        ? "20% 0"
        : authorTopRatedBooks.length === 2
        ? "8% 0"
        : authorTopRatedBooks.length === 3
        ? "4%"
        : ""
    }`,
    textAlign: "center",
  };

  const dropdownItems: MenuProps["items"] = [
    {
      label: (
        <Button type="link" className="text-black">
          Edit
        </Button>
      ),
      key: "edit",
      onClick: () =>
        handleEditOrAddAuthor({ mode: "EDIT", editAuthorDetails: author }),
    },
    {
      label: (
        <Button type="link" danger>
          Delete
        </Button>
      ),
      key: "delete",
      onClick: async () => {
        try {
          await deleteAuthor({
            variables: {
              authorId: author.id,
            },
            update: (cache: ApolloCache<any>) => {
              const { authors }: any = cache.readQuery({
                query: GetAuthorsDocument,
              });
              cache.writeQuery({
                query: GetAuthorsDocument,
                data: {
                  authors: authors.filter((a: Author) => a.id !== author.id),
                },
              });

              // Manually remove books associated with the deleted author from the cache
              const { books }: any = cache.readQuery({
                query: GetBooksDocument,
              });
              cache.writeQuery({
                query: GetBooksDocument,
                data: {
                  books: books.filter((b: Book) => b.author?.id !== author.id),
                },
              });
            },
          });
        } catch (error) {
          console.error("Error deleting author:", error);
        }
      },
    },
  ];
  return (
    <Card
      style={{ width: 260, marginTop: 16 }}
      className="padding-0"
      hoverable={true}
      cover={
        <img
          alt="author_image"
          width={320}
          src="https://images.news18.com/ibnlive/uploads/2024/01/untitled-design-1-2024-01-00cdad2fdf15830dc99fa834057bc7bb.png?impolicy=website&width=640&height=480"
        />
      }
      actions={[
        <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
          <EditOutlined key="edit" />
        </Dropdown>,
        <Tooltip placement="top" title="More books">
          <EllipsisOutlined key="ellipsis" />
        </Tooltip>,
      ]}
    >
      <Skeleton loading={false} active>
        <Card.Meta
          title={author.name}
          style={{ padding: "5%" }}

          // description={`Written by ${book.author?.name}`}
        />
      </Skeleton>
      {!!authorTopRatedBooks.length ? (
        authorTopRatedBooks.map((book: Book) => (
          <Card.Grid key={book.title} style={gridStyle}>
            {book.title}
          </Card.Grid>
        ))
      ) : (
        <Card.Grid
          hoverable={false}
          style={{ textAlign: "center", width: "100%", padding: "20% 0" }}
        >
          No Books to show
        </Card.Grid>
      )}
    </Card>
  );
};

export default AuthorCard;
