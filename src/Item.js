import React, { useState } from "react";
import './Item.css';
import AddField from "./AddField";

function Item(props) {
  const [mouseOver, setMouseOver] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  // -------- handle ---------
  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseLeave() {
    setMouseOver(false);
  }

  function handleShowDescClick() {
    setShowDescription(!showDescription);
  }

  function handleEditClick() {
    setEditing(true);
  }

  function handleDeleteClick() {
    if (!props.isDone) {
      if (window.confirm('Are you sure to delete "' + props.title + '" ?')) {
        props.onClickDelete();
      }
    } else {
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
        <td className="item-due">{renderDue()}</td>
        <td className="button-cell">
          {renderShowDescButton()}
          {renderEditButton()}
          {renderDeleteButton()}
        </td>
      </>
    )
  }

  function renderDue() {
    return <span className="dueDate"> Due: {new Date(props.due).toDateString()}</span>
  }

  function renderShowDescButton() {
    if (mouseOver) {
      return (
        <button className="button" onClick={handleShowDescClick}>
          {(showDescription) ? 'hide description' : 'show description'}
        </button>
      )
    }
  }

  function renderEditButton() {
    if (mouseOver) {
      return (
        <button className="button" onClick={handleEditClick}>
          edit
        </button>
      )
    }
  }

  function renderDeleteButton() {
    if (mouseOver) {
      return (
        <button className="button" onClick={handleDeleteClick}>
          delete
        </button>
      )
    }
  }

  function renderDescription() {
    if (showDescription) {
      return <>Description: {props.description}</>
    }
  }

  if (!editing) {
    return (
      <>
        <tr className="item" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
          {renderTask()}
        </tr>
        <div>
          {renderDescription()}
        </div>
      </>
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