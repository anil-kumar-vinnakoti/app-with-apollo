import Books from "../components/Books";
import Authors from "../components/Authors";
import AddBook from "../components/AddBook";
import { Fragment } from "react";

const Home = () => {
  return (
    <Fragment>
      <div className="flex flex-row gap-4">
        <Books />
        <Authors />
      </div>
      <div className="">
        <AddBook />
      </div>
    </Fragment>
  );
};

export default Home;
