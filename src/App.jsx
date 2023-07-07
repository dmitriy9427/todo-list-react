import React, { useState, useEffect } from "react";
import List from "./components/List/List";
import axios from "axios";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

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

  function onEditTitle(id, title) {
    const newTitile = window.prompt("Введите название списка", title);
    if (newTitile) {
      lists.map((item) => {
        if (item.id === id) {
          item.name = title;
        }
      });
    } else {
      return;
    }
    setLists(newTitile);
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
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
          onClickItem={(i) => setActiveItem(i)}
          activeItem={activeItem}
          onEditTitle={onEditTitle}
        />
      </div>
    </div>
  );
}

export default App;
