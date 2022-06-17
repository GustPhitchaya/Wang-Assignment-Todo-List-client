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

    if (!title) {
      if (description) {
        alert('please fill a title');
      } else {
        setDefault();
      }
    } else {
      if (!description) {
        setDescription('no description');
      }
      if (!props.editing) {
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
      setDefault();
    }
  }

  function blankspace() {
    return <span>&nbsp;&nbsp;</span>;
  }

  function renderTitleForm() {
    return (
      <label className="form">
        Title:
        {blankspace()}
        <input type="text" name="title" className="titleField" onChange={handleTitleChange} defaultValue={title} autoFocus />
      </label>
    )
  }

  function renderDatePicker() {
    return (
      <label className="form">
        Due date:
        {blankspace()}
        <DatePicker
          onChange={handleDueChange}
          value={due}
          calendarClassName="react-date-picker"
        />
      </label>
    )
  }

  function renderDescriptionForm() {
    return (
      <label className="form">
        Description:
        {blankspace()}
        <textarea onChange={handleDescriptionChange} defaultValue={description} />
      </label>
    )
  }

  if (isButton) {
    return (
      <button onClick={handleClick}>
        Add
      </button>
    );
  } else {
    return (
      <form className="new-task-form" onSubmit={handleSubmit}>
        {renderTitleForm()}
        {renderDatePicker()}
        {renderDescriptionForm()}
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default AddField;