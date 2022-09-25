import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const clickHandler = () => {
    setTodos(...todos, todo);
  };

  return (
    <div>
      <div className="todo">
        <input
          type="text"
          value={todo}
          placeholder="Enter the task.."
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="button" onClick={clickHandler}>
          Add todo
        </button>
      </div>
      <div>
        {todos.map((todo, idx) => (
          <p key={idx}>{todo}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
