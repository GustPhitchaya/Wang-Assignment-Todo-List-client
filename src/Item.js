import React, { useState } from "react";
import './Item.css';
import AddField from "./AddField";

function Item(props) {
  const [mouseOver, setMouseOver] = useState(false);
  const [editing, setEditing] = useState(false);

  // -------- handle ---------
  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseLeave() {
    setMouseOver(false);
  }

  function handleEditClick() {
    setEditing(true);
  }

  function handleEditSubmit(updatedItem) {
    props.onSubmitEdit(updatedItem);
    setMouseOver(false);
    setEditing(false);
  }

  // ------- render --------
  function renderTask() {
    return (
      <div>
        <label htmlFor={props._id}>
          <input type="checkbox" id={props._id} checked={props.isDone} value={props.title} onChange={props.onCheck} />
          {props.title}
        </label>
        {renderDue()}
        {renderEditButton()}
        {renderDeleteButton()}
      </div>
    )
  }

  function renderDescription() {
    if (mouseOver) {
      return <div>Description: {props.description}</div>
    }
  }

  function renderDue() {
    return <span className="dueDate"> Due: {new Date(props.due).toDateString()}</span>
  }

  function renderEditButton() {
    if (mouseOver) {
      return (
        <button className={props.darkMode ? "buttonDarkMode" : "button"} onClick={handleEditClick}>
          edit
        </button>
      )
    }
  }

  function renderDeleteButton() {
    if (mouseOver) {
      return (
        <button className={props.darkMode ? "buttonDarkMode" : "button"} onClick={props.onClickDelete}>
          delete
        </button>
      )
    }
  }

  if (!editing) {
    return (
      <div className="item" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        {renderTask()}
        {renderDescription()}
      </div>
    );
  } else {
    return (
      <AddField
        onSubmit={updatedItem => handleEditSubmit(updatedItem)}
        isButton={false}
        _id={props._id}
        title={props.title}
        description={props.description}
        due={new Date(props.due)}
        isDone={props.isDone}
        editing={true}
      />
    )
  }

}

export default Item;