import React, { useState } from "react";
import Badge from "../Badge/Badge";
import closeSvg from "../../images/close.svg";

import "./AddListPopup.scss";

function AddListPopup({ setPopup }) {
  const [colors, setColors] = useState([
    {
      id: 1,
      hex: "#C9D1D3",
      name: "grey",
    },
    {
      id: 2,
      hex: "#42B883",
      name: "green",
    },
    {
      id: 3,
      hex: "#64C4ED",
      name: "blue",
    },
    {
      id: 4,
      hex: "#FFBBCC",
      name: "pink",
    },
    {
      id: 5,
      hex: "#B6E6BD",
      name: "lime",
    },
    {
      id: 6,
      hex: "#C355F5",
      name: "purple",
    },
    {
      id: 7,
      hex: "#110133",
      name: "black",
    },
    {
      id: 8,
      hex: "#FF6464",
      name: "red",
    },
  ]);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);

  return (
    <div className="add-popup">
      <input
        className="add-popup__input field"
        placeholder="Название папки"
        type="text"
      />
      <ul className="add-popup__list">
        {colors.map((color) => (
          <li
            key={color.hex}
            className="add-popup__item"
            title="Выберите цвет для заголовка задачи"
          >
            <Badge
              onClick={() => setSelectedColor(color.id)}
              color={color.name}
              className={selectedColor === color.id && "active"}
            />
          </li>
        ))}
      </ul>
      <button className="add-popup__button button">Добавить</button>
      <img
        onClick={() => setPopup(false)}
        className="add-popup__remove"
        src={closeSvg}
        alt="Кнопка закрыть"
      />
    </div>
  );
}

export default AddListPopup;
