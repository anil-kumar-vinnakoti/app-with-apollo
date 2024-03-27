import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../components/utils/Spinner";

const Login = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <div className="container mx-auto flex justify-center mt-24">
      {!isLoading ? (
        <button
          className="px-4 py-2 rounded-lg bg-blue-400 "
          onClick={() => loginWithRedirect()}
        >
          Login
        </button>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Login;
