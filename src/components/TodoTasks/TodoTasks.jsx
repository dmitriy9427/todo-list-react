import React from "react";
import edit from "../../images/edit.svg";
import delet from "../../images/delete.svg";
import plus from "../../images/plus.svg";

import "./TodoTasks.scss";

function TodoTasks() {
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        Фротенд
        <img
          className="tasks__title-image"
          src={edit}
          alt="Иконка редактирования"
        />
      </h2>

      <ul className="tasks__list">
        <li>
          <div className="checkbox">
            <input id="check" type="checkbox" />
            <label htmlFor="check">
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
          <input
            className="tasks__input"
            // value="Изучить паттерны проектирования"
          />
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
        <li>
          <img
            className="tasks__image-plus"
            src={plus}
            alt="Иконка добавления"
          />
          <span className="tasks__text">Новая задача</span>
        </li>
      </ul>
    </div>
  );
}

export default TodoTasks;
