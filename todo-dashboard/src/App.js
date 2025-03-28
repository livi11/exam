import React from "react";
import TodoList from "./TodoList";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
      <h1>Todo Dashboard</h1>
      <TodoList />
    </div>
  );
}

export default App;
