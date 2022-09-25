import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");

  return (
    <div>
      <div className="todo">
        <input type="text" placeholder="Enter the task.." />
        <button type="button">Add todo</button>
      </div>
    </div>
  );
}

export default App;
