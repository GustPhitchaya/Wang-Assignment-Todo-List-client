import React from 'react';

class AddField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButton: true,
      value: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.setState({
      isButton: false,
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event) {
    if (this.state.value !== '')
      this.props.onAddItem({
        'description': this.state.value,
        'due': '01-01-1970',
        'isDone': false,
      });

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
          <input type='text' id='new-item' name='new-item' onChange={this.handleChange} autoFocus />
        </form>
      )
    }
  }
}

export default AddField;