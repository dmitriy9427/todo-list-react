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
  onEditTitle,
  addTask,
  setLists,
  deleteTask,
  editTask,
  onCompleted,
}) {
  const [popup, setPopup] = useState(false);

  return (
    <div className="todo">
      <ul className="todo__list">
        {lists
          ? lists.map((task, index) => (
              <li
                className={`${
                  activeItem && activeItem.id === task.id && "active"
                }`}
                onClick={onClickItem ? () => onClickItem(task) : null}
                key={index}
              >
                <Badge color={task.color.name} />
                <span>{task.name}</span>({task.tasks && task.tasks.length})
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
      {activeItem && activeItem && (
        <TodoTasks
          onEditTitle={onEditTitle}
          list={activeItem}
          addTask={addTask}
          setLists={setLists}
          deleteTask={deleteTask}
          editTask={editTask}
          onCompleted={onCompleted}
        />
      )}
    </div>
  );
}

export default List;
