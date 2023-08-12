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

  //Удаление задачи
  const deleteTask = (listId, taskId) => {
    if (window.confirm("Удалить задачу?")) {
      const newList = lists.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios
        .delete(
          "https://my-json-server.typicode.com/dmitriy9427/json-server/tasks/" +
            taskId
        )

        .catch(() => {
          alert("Не удалось удалить задачу.");
        });
    }
  };

  // Редактирование задачи
  const editTask = (listId, taskObj) => {
    const newText = window.prompt("Напишите новое название", taskObj.text);
    if (!newText) {
      return;
    }
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks.map((task) => {
          if (taskObj.id === task.id) {
            taskObj.text = newText;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    axios
      .patch(
        "https://my-json-server.typicode.com/dmitriy9427/json-server/tasks/" +
          taskObj.id,
        {
          ...taskObj,
          text: newText,
        }
      )

      .catch(() => {
        alert("Не удалось удалить задачу.");
      });
  };

  const onCompleted = (listId, taskId, completed) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    axios
      .patch(
        "https://my-json-server.typicode.com/dmitriy9427/json-server/tasks/" +
          taskId,
        {
          completed,
        }
      )
      .catch(() => {
        alert("Не удалось обновить");
      });
  };

  // удаение списка задач по заголовку
  const removeItem = (item) => {
    if (window.confirm("Вы действительно хотите удалить?")) {
      axios
        .delete(
          "https://my-json-server.typicode.com/dmitriy9427/json-server/lists/" +
            item.id
        )
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

  function addTask(listId, taskObj) {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  }

  useEffect(() => {
    axios
      .get(
        "https://my-json-server.typicode.com/dmitriy9427/json-server/lists?_expand=color&_embed=tasks"
      )
      .then(({ data }) => {
        setLists(data);
      })
      .catch((err) => {
        alert(err);
      });
    axios
      .get("https://my-json-server.typicode.com/dmitriy9427/json-server/colors")
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
          setLists={setLists}
          deleteTask={deleteTask}
          editTask={editTask}
          onCompleted={onCompleted}
        />
      </div>
    </div>
  );
}

export default App;
