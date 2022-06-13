import React from 'react';
import DatePicker from 'react-date-picker';

class AddField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButton: true,
      title: '',
      date: new Date(),
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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

  handleDateChange(value) {
    this.setState({
      date: value,
    });
  }

  handleSubmit(event) {
    if (this.state.title !== '') {
      this.props.onAddItem({
        'title': this.state.title,
        'due': this.state.date,
        'isDone': false,
      });
      console.log('created "' + this.state.title + '" at ' + this.state.date);
    }

    this.setState({
      isButton: true,
    });

    event.preventDefault();
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
        <form onSubmit={this.handleSubmit}>
          <input type='text' id='new-item' name='new-item' onChange={this.handleTitleChange} autoFocus />
          {/* <DatePicker onChange={this.handleDateChange} value={new Date()} /> */}
        </form>
      )
    }
  }
}

export default AddField;