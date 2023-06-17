import React from "react";

import "./AddListPopup.scss";

function AddListPopup() {
  return (
    <div className="add-popup">
      <input
        className="add-popup__input field"
        placeholder="Название папки"
        type="text"
      />
      <ul></ul>
      <button className="add-popup__button button">Добавить</button>
    </div>
  );
}

export default AddListPopup;
