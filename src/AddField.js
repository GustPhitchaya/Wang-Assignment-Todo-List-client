import React from 'react';
import DatePicker from 'react-date-picker';
import './AddField.css';

class AddField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButton: this.props.isButton,
      title: this.props.title,
      description: this.props.description,
      due: this.props.due,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDueChange = this.handleDueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setDefault() {
    this.setState({
      isButton: true,
      title: '',
      description: '',
      due: new Date(),
    });
  }

  handleClick() {
    this.setState({
      isButton: false,
    });
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value,
    });
  }

  handleDueChange(newValue) {
    this.setState({
      due: newValue,
    });
    console.log(this.state.due);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.title) {
      if (!this.props.editing) {
        console.log(this.state.due);
        this.props.onSubmit({
          'title': this.state.title,
          'description': this.state.description,
          'due': this.state.due,
          'isDone': false,
        });
        console.log('created "' + this.state.title + '" due at ' + this.state.due);
        this.setDefault();
      } else {
        this.props.onSubmit({
          '_id': this.props._id,
          'title': this.state.title,
          'description': this.state.description,
          'due': this.state.due,
          'isDone': this.props.isDone,
        });
        console.log('updated the item');
      }
    }
  }

  blankspace() {
    return <span>&nbsp;&nbsp;</span>;
  }

  renderTitleForm() {
    return (
      <label className="title">
        Title:
        {this.blankspace()}
        <input type="text" name="title" className="titleField" onChange={this.handleTitleChange} defaultValue={this.state.title} autoFocus />
      </label>
    )
  }

  renderDatePicker() {
    return (
      <label>
        Due date:
        {this.blankspace()}
        <DatePicker
          onChange={this.handleDueChange}
          value={this.state.due}
        />
      </label>
    )
  }

  renderDescriptionForm() {
    return (
      <label>
        Description:
        {this.blankspace()}
        <textarea onChange={this.handleDescriptionChange} defaultValue={this.state.description} />
      </label>
    )
  }

  render() {
    if (this.state.isButton) {
      return (
        <button className='add-button' onClick={this.handleClick}>
          +
        </button>
      );
    } else {
      return (
        <form className="new-task-form" onSubmit={this.handleSubmit}>
          {this.renderTitleForm()}
          {this.renderDatePicker()}
          {this.renderDescriptionForm()}
          <input type="submit" value="Submit" className="submitButton" />
        </form>
      )
    }
  }
}

export default AddField;