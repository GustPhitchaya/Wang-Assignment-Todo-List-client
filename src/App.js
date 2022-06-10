import React from "react";
import "./App.css";
import List from "./List.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: null };
  }

  callAPI() {
    fetch("http://localhost:9000/mongo")
      .then(res => res.json())
      .then(items => this.setState({ items: items.name }));
  }

  UNSAFE_componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App" >
        <p>{this.state.items}</p>
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

export default App;