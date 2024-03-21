import "./App.css";
import Home from "./pages/Home";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/Login";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="flex flex-col items-center mt-12">
      {isAuthenticated ? <Home /> : <Login />}
    </div>
  );
}

export default App;
