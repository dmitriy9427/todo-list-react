import React, { useState } from "react";
import Badge from "../Badge/Badge";
import closeSvg from "../../images/close.svg";

import "./AddListPopup.scss";

function AddListPopup({ colors, setPopup, popup, addNewItem }) {
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState("");

  const handleClosePopup = () => {
    setInputValue("");
    setSelectedColor(colors[0].id);
    setPopup(false);
  };

  const addItem = () => {
    const obj = { id: new Date(), name: inputValue, colorId: selectedColor };

    addNewItem(obj);
    handleClosePopup();
  };

  return (
    <div className={`add-popup ${popup && "open"}`}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="add-popup__input field"
        placeholder="Название списка"
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

      {!inputValue ? (
        <>
          <button
            disabled
            onClick={addItem}
            className="add-popup__button button"
          >
            Добавить
          </button>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              color: "red",
              fontSize: "10px",
            }}
          >
            Название не должно быть пустым
          </span>
        </>
      ) : (
        <button onClick={addItem} className="add-popup__button button">
          Добавить
        </button>
      )}

      <img
        onClick={handleClosePopup}
        className="add-popup__remove"
        src={closeSvg}
        alt="Кнопка закрыть"
      />
    </div>
  );
}

export default AddListPopup;
