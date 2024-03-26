import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Card, Skeleton, Dropdown, Button } from "antd";
import { MenuProps } from "antd";
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
  const items: MenuProps["items"] = [
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
              refetchQueries: ["GetBooks"],
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
      style={{ width: 300, marginTop: 16 }}
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
        <Dropdown menu={{ items }} trigger={["click"]}>
          <EllipsisOutlined key="ellipsis" />
        </Dropdown>,
      ]}
    >
      <Skeleton loading={isLoading} active>
        <Meta
          title={book.title}
          description={`Written by ${book.author?.name}`}
        />
      </Skeleton>
    </Card>
  );
};

export default BookCard;
