import React from 'react';
import './App.css';
import List from './List.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: null };
  }

  callAPI() {
    fetch('http://localhost:9000/mongo')
      .then(res => res.text())
      .then(items => JSON.parse(items))
      .then(items => this.setState({ items: items }));
  }

  UNSAFE_componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className='App' >
        <header className='App-header'>
          <p>To-Do List</p>
        </header>
        <div className='Todo-list'>
          <List 
            items={this.state.items}
          />
        </div>
      </div>
    );
  }
}

export default App;