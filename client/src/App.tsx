import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/Login";

// function App() {

//   return (
//     <div className="flex flex-col items-center mt-12">
//       {isAuthenticated ? <Home /> : <Login />}
//     </div>
//   );
// }

import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./components/Books/Books";
import Authors from "./components/Authors";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";

const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Fragment>
      {isAuthenticated ? (
        <Router>
          <Navbar />
          <div className="container mx-auto mt-8">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/books" component={Books} />
              <Route exact path="/authors" component={Authors} />
            </Switch>
          </div>
        </Router>
      ) : (
        <Login />
      )}
    </Fragment>
  );
};

export default App;
