import React from 'react';
import './App.css';

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

    //return this.props.onClick();
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event) {
    if (this.state.value !== '')
      this.props.onAddItem(this.state.value);

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
          <input type='text' id='new-item' name='new-item' onChange={this.handleChange} onBlur={this.handleSubmit} autoFocus />
        </form>
      )
    }
  }
}

class Item extends React.Component {
  render() {
    const id = this.props.id;
    const desc = this.props.desc;

    return (
      <>
        <input type='checkbox' id={id} value={desc} />
        <label htmlFor={id}>{desc}</label>
      </>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemNumber: 0,
    };
  }

  addNewItem(newItem) {
    const items = this.state.items.slice();
    const itemNumber = this.state.itemNumber;
    this.setState({
      items: items.concat([{
        id: itemNumber + 1,
        desc: newItem,
      }]),
      itemNumber: itemNumber + 1,
    });
  }

  renderAddButton() {
    return (
      <AddField
        onAddItem={newItem => this.addNewItem(newItem)}
      />
    );
  }

  renderItem(item) {
    return (
      <Item
        id={item.id}
        type={item.type}
        desc={item.desc}
      />
    );
  }

  renderList() {
    const items = this.state.items.slice();
    return items.map(item => 
      <li key={item.id} className='Item'>
        {this.renderItem(item)}
      </li>
    );
  }

  render() {
    return (
      <ul className='List'>
        {this.renderList()}
        {this.renderAddButton()}
      </ul>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <p>To-Do List</p>
        </header>
        <div className="Todo-list">
          <List />
        </div>
      </div>
    );
  }
}

function getItems() {
  // //example
  // return [
  //   {
  //     id: 'i1',
  //     type: 'study',
  //     desc: 'homework'
  //   },
  //   {
  //     id: 'i2',
  //     type: 'work',
  //     desc: 'web'
  //   }
  // ];
}

export default App;
