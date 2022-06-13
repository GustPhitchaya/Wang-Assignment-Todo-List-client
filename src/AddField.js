import React from 'react';
import DatePicker from 'react-date-picker';
import './AddField.css';

class AddField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButton: true,
      title: '',
      description: '',
      due: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDueChange = this.handleDueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (this.state.title !== '') {
      console.log(this.state.due);
      this.props.onAddItem({
        'title': this.state.title,
        'description': this.state.description,
        'due': this.state.due,
        'isDone': false,
      });
      console.log('created "' + this.state.title + '" due at ' + this.state.due);
    }

    this.setState({
      isButton: true,
      'due': new Date(),
    });

    event.preventDefault();
  }

  blankspace() {
    return <span>&nbsp;&nbsp;</span>;
  }

  renderTitleForm() {
    return (
      <label>
        Title:
        {this.blankspace()}
        <input type="text" name="title" onChange={this.handleTitleChange} autoFocus />
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
        <textarea onChange={this.handleDescriptionChange} />
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
          <input type="submit" value="Submit" />
        </form>
      )
    }
  }
}

export default AddField;