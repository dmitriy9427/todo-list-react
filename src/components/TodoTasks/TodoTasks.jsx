import React from "react";
import edit from "../../images/edit.svg";
import delet from "../../images/delete.svg";
import plus from "../../images/plus.svg";

import "./TodoTasks.scss";

function TodoTasks() {
  return (
    <div className="t">
      <div className="tasks">
        <h2 className="tasks__title">Фротенд</h2>
        <img src={edit} alt="Иконка редактирования" />
      </div>

      <ul>
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
          <input className="t__input" value="Изучить паттерны проектирования" />
          <img
            className="t__image-edit"
            src={edit}
            alt="Иконка редактирования"
          />
          <img className="t__image-delete" src={delet} alt="Иконка удаления" />
        </li>
        <li>
          <img className="t__image-plus" src={plus} alt="Иконка добавления" />
          <span className="t__text">Новая задача</span>
        </li>
      </ul>
    </div>
  );
}

export default TodoTasks;
