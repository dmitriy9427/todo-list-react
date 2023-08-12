import React, { useState } from "react";
import edit from "../../images/edit.svg";
import delet from "../../images/delete.svg";
import plus from "../../images/plus.svg";
import axios from "axios";

import "./TodoTasks.scss";

function TodoTasks({
  list,
  onEditTitle,
  addTask,
  deleteTask,
  editTask,
  onCompleted,
}) {
  const [newTask, setNewTask] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function editTitle() {
    const newTitle = window.prompt("Введите название списка", list.name);

    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch(
          "https://my-json-server.typicode.com/dmitriy9427/json-server/lists/" +
            list.id,
          {
            name: newTitle,
          }
        )
        .catch(() => {
          alert("Что то пошло не так. Не удалось обновить название списка.");
        });
    }
  }

  function toggleFormTask() {
    setNewTask(!newTask);
    setInputValue("");
  }

  function addNewTasks() {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };

    axios
      .post(
        "https://my-json-server.typicode.com/dmitriy9427/json-server/tasks/",
        obj
      )
      .then(({ data }) => {
        addTask(list.id, data);
        toggleFormTask();
      })
      .catch(() => {
        alert("Не удалось добавить задачу.");
      });
  }

  return (
    <div className="tasks">
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img
          className="tasks__title-image"
          onClick={editTitle}
          src={edit}
          alt="Иконка редактирования"
        />
      </h2>

      <ul className="tasks__list">
        {list.tasks && !list.tasks.length && <h3>Задачи отсутствуют</h3>}
        {list.tasks &&
          list.tasks.map((t, i) => (
            <li className={`${t.completed && "through"}`} key={i}>
              <div className="checkbox">
                <input
                  onChange={(e) => onCompleted(list.id, t.id, e.target.checked)}
                  id={`task-${t.id}`}
                  type="checkbox"
                  checked={t.completed}
                />
                <label htmlFor={`task-${t.id}`}>
                  <svg
                    width="11"
                    height="8"
                    viewBox="0 0 11 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
              </div>
              <p className="tasks__input">{t.text}</p>

              <img
                className="tasks__image-edit"
                onClick={() => editTask(list.id, t)}
                src={edit}
                alt="Иконка редактирования"
              />
              <img
                className="tasks__image-delete"
                onClick={() => {
                  deleteTask(list.id, t.id);
                }}
                src={delet}
                alt="Иконка удаления"
              />
            </li>
          ))}
      </ul>
      {!newTask ? (
        <div onClick={toggleFormTask} className="tasks__plus-block">
          <img
            className="tasks__image-plus"
            src={plus}
            alt="Иконка добавления"
          />
          <span className="tasks__text">Новая задача</span>
        </div>
      ) : (
        <div className="tasks__popup">
          <input
            type="text"
            placeholder="Текст задачи"
            className="tasks__popup-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div>
            <button
              onClick={addNewTasks}
              disabled={!inputValue ? true : false}
              className="button tasks__popup-add"
            >
              Добавить задачу
            </button>
            <button className="tasks__popup-cancel" onClick={toggleFormTask}>
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoTasks;
