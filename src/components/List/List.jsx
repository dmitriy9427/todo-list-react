import React, { useState, useEffect } from "react";
import AddListPopup from "../AddListPopup/AddListPopup";
import Badge from "../Badge/Badge";
import TodoTasks from "../TodoTasks/TodoTasks";

import delet from "../../images/delete.svg";

import "./List.scss";

function List({
  lists,
  addNewItem,
  removeItem,
  colors,
  onClickItem,
  activeItem,
}) {
  const [popup, setPopup] = useState(false);

  return (
    <div className="todo">
      <ul className="todo__list">
        <li className="todo__list-item">
          <i className="todo__list-i">
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.96 5.10001H5.74C5.2432 5.10001 5.2 5.50231 5.2 6.00001C5.2 6.49771 5.2432 6.90001 5.74 6.90001H10.96C11.4568 6.90001 11.5 6.49771 11.5 6.00001C11.5 5.50231 11.4568 5.10001 10.96 5.10001ZM12.76 9.60001H5.74C5.2432 9.60001 5.2 10.0023 5.2 10.5C5.2 10.9977 5.2432 11.4 5.74 11.4H12.76C13.2568 11.4 13.3 10.9977 13.3 10.5C13.3 10.0023 13.2568 9.60001 12.76 9.60001ZM5.74 2.40001H12.76C13.2568 2.40001 13.3 1.99771 13.3 1.50001C13.3 1.00231 13.2568 0.600006 12.76 0.600006H5.74C5.2432 0.600006 5.2 1.00231 5.2 1.50001C5.2 1.99771 5.2432 2.40001 5.74 2.40001ZM2.86 5.10001H1.24C0.743197 5.10001 0.699997 5.50231 0.699997 6.00001C0.699997 6.49771 0.743197 6.90001 1.24 6.90001H2.86C3.3568 6.90001 3.4 6.49771 3.4 6.00001C3.4 5.50231 3.3568 5.10001 2.86 5.10001ZM2.86 9.60001H1.24C0.743197 9.60001 0.699997 10.0023 0.699997 10.5C0.699997 10.9977 0.743197 11.4 1.24 11.4H2.86C3.3568 11.4 3.4 10.9977 3.4 10.5C3.4 10.0023 3.3568 9.60001 2.86 9.60001ZM2.86 0.600006H1.24C0.743197 0.600006 0.699997 1.00231 0.699997 1.50001C0.699997 1.99771 0.743197 2.40001 1.24 2.40001H2.86C3.3568 2.40001 3.4 1.99771 3.4 1.50001C3.4 1.00231 3.3568 0.600006 2.86 0.600006Z"
                fill="#7C7C7C"
              />
            </svg>
          </i>
          <span className="todo__list-span">Все задачи</span>
        </li>
        {lists
          ? lists.map((task) => (
              <li
                className={`${
                  activeItem && activeItem.id === task.id && "active"
                }`}
                onClick={onClickItem ? () => onClickItem(task) : null}
                key={task.id}
              >
                <Badge color={task.color.name} />

                <span>
                  {task.name}
                  {` (${task.tasks.length})`}
                </span>
                <img
                  onClick={() => removeItem(task)}
                  className="todo__list-delete"
                  src={delet}
                  alt="Иконка удаления"
                />
              </li>
            ))
          : "Загрузка..."}
        <li onClick={() => setPopup(true)}>
          <i>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1V11"
                stroke="#868686"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 6H11"
                stroke="#868686"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
          <span>Добавить папку</span>
        </li>
      </ul>

      <AddListPopup
        addNewItem={addNewItem}
        colors={colors}
        setPopup={setPopup}
        popup={popup}
      />

      <div className="todo__tasks">
        {lists && activeItem && <TodoTasks list={activeItem} />}
      </div>
    </div>
  );
}

export default List;
