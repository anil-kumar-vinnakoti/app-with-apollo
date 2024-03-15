import "./App.css";
import Authors from "./components/Authors";
import Books from "./components/Books";
import AddBook from "./components/AddBook";

function App() {
  return (
    <div className="flex flex-col items-center mt-12">
      <div className="flex flex-row gap-4">
        <Books />
        <Authors />
      </div>
      <div className="">
        <AddBook />
      </div>
    </div>
  );
}

export default App;
