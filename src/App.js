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
      darkMode: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      darkMode: !this.state.darkMode,
    })
    document.body.classList.toggle('bodyDarkMode');
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

  componentDidMount() {
    this.fetchItems();
  }

  render() {
    //console.log(this.state.items.length);
    return (
      <div className='App' >
        <header className='App-header'>
          <p>To-Do List</p>
          <button onClick={this.handleClick} className={this.state.darkMode ? "buttonDarkMode" : "button"}>
            {this.state.darkMode ? 'light mode' : 'dark mode'}
          </button>
        </header>
        <div className='Todo-list'>
          <List
            uncompletedItems={this.state.uncompletedItems}
            completedItems={this.state.completedItems}
            darkMode={this.state.darkMode}
            refresh={() => this.fetchItems()}
          />
        </div>
      </div>
    );
  }
}

export default App;