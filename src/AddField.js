import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import './AddField.css';

function AddField(props) {
  const [isButton, setIsButton] = useState(props.isButton);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [due, setDue] = useState(props.due);

  function setDefault() {
    setIsButton(true);
    setTitle('');
    setDescription('');
    setDue(new Date());
  }

  function handleClick() {
    setIsButton(false);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleDueChange(newValue) {
    setDue(newValue);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (title) {
      if (!props.editing) {
        console.log(due);
        props.onSubmit({
          'title': title,
          'description': description,
          'due': due,
          'isDone': false,
        });
        console.log('created "' + title + '" due at ' + due);
      } else {
        props.onSubmit({
          '_id': props._id,
          'title': title,
          'description': description,
          'due': due,
          'isDone': props.isDone,
        });
        console.log('updated the item');
      }
    }
    setDefault();
  }

  function blankspace() {
    return <span>&nbsp;&nbsp;</span>;
  }

  function renderTitleForm() {
    return (
      <label className="title">
        Title:
        {blankspace()}
        <input type="text" name="title" className="titleField" onChange={handleTitleChange} defaultValue={title} autoFocus />
      </label>
    )
  }

  function renderDatePicker() {
    return (
      <label>
        Due date:
        {blankspace()}
        <DatePicker
          onChange={handleDueChange}
          value={due}
        />
      </label>
    )
  }

  function renderDescriptionForm() {
    return (
      <label>
        Description:
        {blankspace()}
        <textarea onChange={handleDescriptionChange} defaultValue={description} />
      </label>
    )
  }

  if (isButton) {
    return (
      <button className={props.darkMode ? "buttonDarkMode" : "button"} onClick={handleClick}>
        +
      </button>
    );
  } else {
    return (
      <form className="new-task-form" onSubmit={handleSubmit}>
        {renderTitleForm()}
        {renderDatePicker()}
        {renderDescriptionForm()}
        <input type="submit" value="Submit" className={props.darkMode ? "buttonDarkMode" : "button"} />
      </form>
    )
  }
}

export default AddField;