import "./App.css";
import Authors from "./components/Authors";
import Books from "./components/Books";

function App() {
  return (
    <div className="flex justify-center mt-12">
      <div className="flex flex-row gap-4">
        <Books />
        <Authors />
      </div>
    </div>
  );
}

export default App;
