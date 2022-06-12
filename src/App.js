import React from 'react';
import './App.css';
import List from './List.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: null };
  }

  fetchItems() {
    fetch('http://localhost:9000/mongo')
      .then(res => res.text())
      .then(items => JSON.parse(items))
      .then(items => this.setState({ items: items }))
      .catch(err => console.log(err));
  }

  UNSAFE_componentWillMount() {
    this.fetchItems();
  }

  render() {
    //console.log(this.state.items.length);

    return (
      <div className='App' >
        <header className='App-header'>
          <p>To-Do List</p>
        </header>
        <div className='Todo-list'>
          <List
            items={this.state.items}
            refresh={() => this.fetchItems()}
          />
        </div>
      </div>
    );
  }
}

export default App;