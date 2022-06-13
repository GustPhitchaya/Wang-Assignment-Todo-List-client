import React from 'react';
import './App.css';
import List from './List.js';

const databaseAPI = 'http://localhost:9000/mongo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uncompletedItems: null,
      completedItems: null,
    };
  }

  fetchItems() {
    fetch(databaseAPI + '/uncompleted')
      .then(res => res.text())
      .then(items => JSON.parse(items))
      .then(items => this.setState({ uncompletedItems: items }))
      .catch(err => console.log(err));

    fetch(databaseAPI + '/completed')
      .then(res => res.text())
      .then(items => JSON.parse(items))
      .then(items => this.setState({ completedItems: items }))
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
            uncompletedItems={this.state.uncompletedItems}
            completedItems={this.state.completedItems}
            refresh={() => this.fetchItems()}
          />
        </div>
      </div>
    );
  }
}

export default App;