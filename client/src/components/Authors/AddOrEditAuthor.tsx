import { useEffect, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { Store } from "antd/es/form/interface";
import {
  Author,
  useAddAuthorMutation,
  useUpdateAuthorMutation,
} from "../../gql/types";
// import { useGetAuthorsQuery } from "../../gql/types";

// type AuthorOption = {
//   label: string;
//   value: number;
// };

const AddOrEditAuthor = ({
  isModalOpen,
  setIsModalOpen,
  editAuthorDetails,
  mode,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  editAuthorDetails?: Author;
  mode: string;
}) => {
  const [formValues, setFormValues] = useState<Store>({});
  const [addAuthor] = useAddAuthorMutation();
  const [updateAuthor] = useUpdateAuthorMutation();
  //   const [authorOptions, setAuthorOptions] = useState<AuthorOption[]>([]);
  //   const { data, loading, error } = useGetAuthorsQuery();

  useEffect(() => {
    if (editAuthorDetails) {
      setFormValues({
        name: editAuthorDetails.name,
        // authorId: editAuthorDetails.authorId,
      });
    } else {
      setFormValues({});
    }
  }, [editAuthorDetails]);

  //   useEffect(() => {
  //     if (data && data.authors && data.authors.length > 0 && !loading) {
  //       const options = data.authors.map((author: any) => ({
  //         //[TODO] Fix any type
  //         label: author.name,
  //         value: author.id,
  //       }));
  //       setAuthorOptions(options);
  //     }
  //   }, [data, loading]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormValues({});
  };

  const onFinish = (values: Store) => {
    const method = mode === "ADD" ? addAuthor : updateAuthor;

    method({
      variables: {
        name: values.name,
        authorId: values.authorId,
        // bookId: editAuthorDetails?.id as number,
      },
      refetchQueries: ["GetAuthors"],
      onCompleted: handleCancel,
    });
  };

  return (
    <Modal
      title={mode === "ADD" ? "Add Author" : "Edit Author"}
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
          label="Author Name"
          name="name"
          rules={[{ required: true, message: "Please enter the author name" }]}
        >
          <Input placeholder="Enter author name" />
        </Form.Item>

        {/* <Form.Item
          label="Author"
          name="authorId"
          rules={[{ required: true, message: "Please select the author" }]}
        >
          <Select placeholder="Select Author" options={authorOptions} />
        </Form.Item> */}

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

export default AddOrEditAuthor;
