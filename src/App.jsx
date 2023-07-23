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

  // удаение списка задач
  const removeItem = (item) => {
    if (window.confirm("Вы действительно хотите удалить?")) {
      axios
        .delete("http://localhost:3001/lists/" + item.id)
        .then(() => {
          onRemove(item.id);
        })
        .catch(() => {
          alert("Не удалось удалить список.");
        });
    }
  };

  function onEditTitle(id, title) {
    const newTitle = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newTitle);
  }

  function addTask(listId, listObj) {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, listObj];
      }
      return item;
    });
    setLists(newList);
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      })
      .catch((err) => {
        alert(err);
      });
    axios
      .get("http://localhost:3001/colors")
      .then(({ data }) => {
        setColors(data);
      })
      .catch((err) => {
        alert("Что то пошло не так при получании цветов.");
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
          addTask={addTask}
          // removeTask={removeTask}
        />
      </div>
    </div>
  );
}

export default App;
