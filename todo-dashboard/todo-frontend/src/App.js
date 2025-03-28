import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Fetch todos from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (!text.trim()) return;
    axios
      .post("http://localhost:5000/todos", { text, completed: false })
      .then((response) => {
        setTodos([...todos, response.data]);
        setText("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  // Toggle completion status
  const toggleTodo = (id, completed) => {
    axios
      .put(`http://localhost:5000/todos/${id}`, { completed: !completed })
      .then((response) => {
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Todo Dashboard</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new task"
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button onClick={addTodo} style={{ padding: "5px 10px" }}>
        Add Todo
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id, todo.completed)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <span
              style={{
                color: todo.completed ? "green" : "orange",
                fontWeight: "bold",
              }}
            >
              {todo.completed ? "Completed" : "Ongoing"}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
