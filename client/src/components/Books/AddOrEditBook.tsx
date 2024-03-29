import { useEffect, useState } from "react";
import { Form, Input, Select, Button, Modal } from "antd";
import { Store } from "antd/es/form/interface";
import {
  Book,
  useAddBookMutation,
  useUpdateBookMutation,
} from "../../gql/types";
import { useGetAuthorsQuery } from "../../gql/types";

type AuthorOption = {
  label: string;
  value: number;
};

const AddBook = ({
  isModalOpen,
  setIsModalOpen,
  editBookDetails,
  mode,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  editBookDetails?: Book;
  mode: string;
}) => {
  const [formValues, setFormValues] = useState<Store>({});
  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [authorOptions, setAuthorOptions] = useState<AuthorOption[]>([]);
  const { data, loading, error } = useGetAuthorsQuery();

  useEffect(() => {
    if (editBookDetails) {
      setFormValues({
        title: editBookDetails.title,
        authorId: editBookDetails.authorId,
      });
    } else {
      setFormValues({});
    }
  }, [editBookDetails]);

  useEffect(() => {
    if (data && data.authors && data.authors.length > 0 && !loading) {
      const options = data.authors.map((author: any) => ({
        //[TODO] Fix any type
        label: author.name,
        value: author.id,
      }));
      setAuthorOptions(options);
    }
  }, [data, loading]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormValues({});
  };

  const onFinish = (values: Store) => {
    const method = mode === "ADD" ? addBook : updateBook;

    method({
      variables: {
        title: values.title,
        authorId: values.authorId,
        bookId: editBookDetails?.id!,
      },
      refetchQueries: ["GetBooks", "GetAuthors"],
      onCompleted: handleCancel,
    });
  };

  return (
    <Modal
      title="Add Book"
      open={isModalOpen}
      onCancel={handleCancel}
      destroyOnClose
      footer={null}
      closable={false}
    >
      <Form
        name="bookForm"
        onFinish={onFinish}
        layout="vertical"
        initialValues={formValues}
        className="mt-4"
      >
        <Form.Item
          label="Book Title"
          name="title"
          rules={[{ required: true, message: "Please enter the book title" }]}
        >
          <Input placeholder="Enter book title" />
        </Form.Item>

        <Form.Item
          label="Author"
          name="authorId"
          rules={[{ required: true, message: "Please select the author" }]}
        >
          <Select placeholder="Select Author" options={authorOptions} />
        </Form.Item>

        <Form.Item className="flex justify-center mb-1">
          <Button
            htmlType="submit"
            className="bg-black rounded-full px-4 py-2 leading-3 text-white"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBook;
