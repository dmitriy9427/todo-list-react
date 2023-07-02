import React, { useState, useEffect } from "react";
import List from "./components/List/List";
import axios from "axios";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  function addNewItem(obj) {
    const newList = [...lists, obj];
    setLists(newList);
  }

  const onRemove = (item) => {
    const newLists = lists.filter((i) => i.id !== item);
    setLists(newLists);
  };

  const removeItem = (item) => {
    if (window.confirm("Вы действительно хотите удалить?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/lists?_expand=color").then(({ data }) => {
      setLists(data);
    });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  return (
    <div className="todo-app">
      <div className="todo-app__sidebar">
        <List
          lists={lists}
          removeItem={removeItem}
          colors={colors}
          addNewItem={addNewItem}
        />
      </div>
    </div>
  );
}

export default App;
