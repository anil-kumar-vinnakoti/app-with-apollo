import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Card, Skeleton, Dropdown, Button, MenuProps } from "antd";
import { Book } from "../../gql/types";
import { useDeleteBookMutation } from "../../gql/types";

const { Meta } = Card;

const BookCard = ({
  book,
  isLoading,
  handleEditOrAddBook,
}: {
  book: Book;
  isLoading: boolean;
  handleEditOrAddBook: ({
    mode,
    editBookDetails,
  }: {
    mode: string;
    editBookDetails: Book;
  }) => undefined;
}) => {
  const [deleteBook] = useDeleteBookMutation();
  const dropdownItems: MenuProps["items"] = [
    {
      label: (
        <Button
          type="link"
          danger
          onClick={() =>
            deleteBook({
              variables: {
                bookId: book.id,
              },
              refetchQueries: ["GetBooks", "GetAuthors"],
            })
          }
        >
          Delete
        </Button>
      ),
      key: "0",
    },
  ];

  return (
    <Card
      hoverable
      style={{ width: 280, marginTop: 16 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <EditOutlined
          key="edit"
          onClick={() =>
            handleEditOrAddBook({ mode: "EDIT", editBookDetails: book })
          }
        />,
        <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
          <EllipsisOutlined key="ellipsis" />
        </Dropdown>,
      ]}
    >
      <Skeleton loading={isLoading} active>
        <div className="p-4">
          <Meta
            title={book.title}
            // description={`Written by ${book.author?.name}`}
          />
          <p className="mt-2">
            Writtern by <strong>{book.author?.name}</strong>
          </p>
        </div>
      </Skeleton>
    </Card>
  );
};

export default BookCard;
