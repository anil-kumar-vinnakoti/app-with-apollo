import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="container mx-auto flex justify-center mt-24">
      <button
        className="px-4 py-2 rounded-lg bg-blue-400 "
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
