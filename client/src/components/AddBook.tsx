import { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AddBook = () => {
  const { logout } = useAuth0();

  return (
    <Fragment>
      <button
        className="px-4 py-2 bg-red-400 rounded-lg"
        onClick={() => logout()}
      >
        Logout
      </button>
    </Fragment>
  );
};

export default AddBook;
