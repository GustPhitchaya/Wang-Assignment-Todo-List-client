import React from 'react';

import './App.css';

function AddButton(props) {
  return (
    <button className='add-button' onClick={props.onClick}>
      add new item
    </button>
  );
}

class Item extends React.Component {
  render() {
    const id = this.props.id;
    const desc = this.props.desc;

    return (
      <>
      <input type='checkbox' id={id} value={desc}/>
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
      <AddButton 
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
