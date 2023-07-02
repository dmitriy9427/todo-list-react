import React, { useEffect, useState } from "react";
import axios from "axios";
import Badge from "../Badge/Badge";
import closeSvg from "../../images/close.svg";

import "./AddListPopup.scss";

function AddListPopup({ colors, setPopup, popup, addNewItem }) {
  const [selectedColor, setSelectedColor] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const handleClosePopup = () => {
    setInputValue("");
    setSelectedColor(colors[0].id);
    setPopup(false);
  };

  const addItem = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0].name;
        const newObj = { ...data, color: { name: color } };
        addNewItem(newObj);
        handleClosePopup();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const v = (e) => setInputValue(e.target.value);

  return (
    <div className={`add-popup ${popup && "open"}`}>
      <input
        value={inputValue}
        onChange={v}
        className="add-popup__input field"
        placeholder="Название списка"
        type="text"
      />
      <ul className="add-popup__list">
        {colors?.map((color) => (
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
          {isLoading ? "Добавление..." : "Добавить"}
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
