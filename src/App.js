import { UseState } from "./UseState";
// import { ClassState } from "./ClassState";
import { UseReducer } from "./useReducer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <UseReducer name="UseReducer" />
    </div>
  );
}

export default App;
