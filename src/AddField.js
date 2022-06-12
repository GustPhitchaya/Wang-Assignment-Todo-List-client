import React from 'react';
import DatePicker from 'react-date-picker';

class AddField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButton: true,
      description: '',
      date: new Date(),
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.setState({
      isButton: false,
    });
  }

  handleDescChange(event) {
    this.setState({
      description: event.target.value,
    });
  }

  handleDateChange(value) {
    this.setState({
      date: value,
    });
  }

  handleSubmit(event) {
    if (this.state.description !== '')
      this.props.onAddItem({
        'description': this.state.description,
        'due': this.state.date,
        'isDone': false,
      });

    this.setState({
      isButton: true,
    });

    console.log('created "' + this.state.description + '" at ' + this.state.date);

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
          <input type='text' id='new-item' name='new-item' onChange={this.handleDescChange} autoFocus />
          {/* <DatePicker onChange={this.handleDateChange} value={new Date()} /> */}
        </form>
      )
    }
  }
}

export default AddField;