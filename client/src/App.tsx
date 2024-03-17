import "./App.css";
import Home from "./pages/Home";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/Login";
import { useEffect } from "react";

function App() {
  const { isAuthenticated } = useAuth0();

  // useEffect(() => {
  //   console.log("Hi");
  // }, []);

  return (
    <div className="flex flex-col items-center mt-12">
      {isAuthenticated ? <Home /> : <Login />}
    </div>
  );
}

export default App;
