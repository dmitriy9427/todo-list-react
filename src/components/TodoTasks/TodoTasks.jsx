import React from "react";
import edit from "../../images/edit.svg";
import delet from "../../images/delete.svg";
import plus from "../../images/plus.svg";

import "./TodoTasks.scss";

function TodoTasks({ list }) {
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img
          className="tasks__title-image"
          src={edit}
          alt="Иконка редактирования"
        />
      </h2>

      <ul className="tasks__list">
        {list.tasks.length === 0 && <h3>Задачи отсутствуют</h3>}
        {list.tasks.map((t) => (
          <li key={t.id}>
            <div className="checkbox">
              <input id={`task-${t.id}`} type="checkbox" />
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
            <input className="tasks__input" readOnly value={t.text} />
            <img
              className="tasks__image-edit"
              src={edit}
              alt="Иконка редактирования"
            />
            <img
              className="tasks__image-delete"
              src={delet}
              alt="Иконка удаления"
            />
          </li>
        ))}
      </ul>
      <div className="tasks__plus-block">
        <img className="tasks__image-plus" src={plus} alt="Иконка добавления" />
        <span className="tasks__text">Новая задача</span>
      </div>
    </div>
  );
}

export default TodoTasks;
