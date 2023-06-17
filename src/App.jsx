import React from "react";
import List from "./components/List/List";

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List />
      </div>
    </div>
  );
}

export default App;
