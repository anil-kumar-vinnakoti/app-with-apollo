import React, { Fragment } from "react";
import { Card, Dropdown, Skeleton } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Author } from "../../gql/types";

const gridStyle: React.CSSProperties = {
  width: "100%",
  padding: "4%",
  textAlign: "center",
};

const AuthorCard = ({ author }: { author: Author }) => {
  const authorTopRatedBooks = author.books.slice(0, 3);
  return (
    <Card
      style={{ width: 260, marginTop: 16 }}
      className="ant-card-body"
      hoverable={true}
      cover={
        <img
          alt="author_image"
          width={320}
          src="https://images.news18.com/ibnlive/uploads/2024/01/untitled-design-1-2024-01-00cdad2fdf15830dc99fa834057bc7bb.png?impolicy=website&width=640&height=480"
        />
      }
      actions={[
        <EditOutlined key="edit" />,
        //   <Dropdown menu={{ items }} trigger={["click"]}>
        <EllipsisOutlined key="ellipsis" />,
        //   </Dropdown>,
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
        authorTopRatedBooks.map((book, index) => (
          <Card.Grid key={index} style={gridStyle}>
            {book.title}
          </Card.Grid>
        ))
      ) : (
        <Card.Grid style={gridStyle}>No Books to show</Card.Grid>
      )}
    </Card>
  );
};

export default AuthorCard;
