import React from "react";
import "./App.css";
import List from "./List.js";

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

export default App;