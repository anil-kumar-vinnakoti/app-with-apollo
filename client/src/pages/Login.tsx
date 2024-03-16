import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const {
    loginWithPopup,
    loginWithRedirect,
    user,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  return (
    <div>
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
