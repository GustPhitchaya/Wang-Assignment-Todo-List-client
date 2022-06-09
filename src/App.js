import React from 'react';
import './App.css';

class AddField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButton: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleClick() {
    this.setState({
      isButton: false,
    });

    //return this.props.onClick();
  }

  handleOnBlur() {
    this.setState({
      isButton: true,
    });
  }

  render() {
    if (this.state.isButton) {
      return (
        <button className='add-button' onClick={this.handleClick}>
          add new item
        </button>
      );
    } else {
      return (
        <>
          <input type='text' id='new-item' name='new-item' value='enter new item' onBlur={this.handleOnBlur} autoFocus />
          <label htmlFor='new-item'></label>
        </>
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
  addNewItem() {

  }

  renderAddButton() {
    return (
      <AddField
        onClick={() => this.addNewItem()}
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
    const items = getItems();
    return items.map(item => {
      return <li className='Item'>
        {this.renderItem(item)}
      </li>
    });
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
  //example
  return [
    {
      id: 'i1',
      type: 'study',
      desc: 'homework'
    },
    {
      id: 'i2',
      type: 'work',
      desc: 'web'
    }
  ];
}

export default App;
