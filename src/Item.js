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

  function handleShowDescClick() {
    
  }

  function handleEditClick() {
    setEditing(true);
  }

  function handleDeleteClick() {
    if (window.confirm('Are you sure to delete "' + props.title + '" ?')) {
      props.onClickDelete();
    }
  }

  function handleEditSubmit(updatedItem) {
    props.onSubmitEdit(updatedItem);
    setMouseOver(false);
    setEditing(false);
  }

  // ------- render --------
  function renderTask() {
    return (
      <>
        <td className="item-title">
          <label htmlFor={props._id}>
            <input type="checkbox" id={props._id} checked={props.isDone} value={props.title} onChange={props.onCheck} />
            {props.title}
          </label>
        </td>
        <td>{renderDue()}</td>
        <td>{renderShowDescButton()}</td>
        <td>{renderEditButton()}</td>
        <td>{renderDeleteButton()}</td>
      </>
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

  function renderShowDescButton() {
    if (mouseOver) {
      return (
        <button className={props.darkMode ? "buttonDarkMode" : "button"} onClick={handleShowDescClick}>
          show description
        </button>
      )
    }
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
        <button className={props.darkMode ? "buttonDarkMode" : "button"} onClick={handleDeleteClick}>
          delete
        </button>
      )
    }
  }

  if (!editing) {
    return (
      <tr className="item" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        {renderTask()}
        {/* <tr>
          <td>{renderDescription()}</td>
        </tr> */}
      </tr>
    );
  } else {
    return (
      <tr>
        <td>
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
        </td>
      </tr>
    )
  }

}

export default Item;