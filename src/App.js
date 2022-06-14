import React, { useEffect, useState } from 'react';
import './App.css';
import List from './List.js';

const databaseAPI = 'http://localhost:9000/mongo';

function App() {
  const [uncompletedItems, setUncompletedItems] = useState(null);
  const [completedItems, setCompletedItems] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [dummy, setDummy] = useState(false);

  function handleClick() {
    setDarkMode(!darkMode);
    document.body.classList.toggle('bodyDarkMode');
  }

  function fetchItems() {
    fetch(databaseAPI + '/uncompleted')
      .then(res => res.text())
      .then(items => JSON.parse(items))
      .then(items => setUncompletedItems(items))
      .catch(err => console.log(err));

    fetch(databaseAPI + '/completed')
      .then(res => res.text())
      .then(items => JSON.parse(items))
      .then(items => setCompletedItems(items))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchItems();
  }, [dummy]);

  return (
    <div className='App' >
      <header className='App-header'>
        <p>To-Do List</p>
        <button onClick={handleClick} className={darkMode ? "buttonDarkMode" : "button"}>
          {darkMode ? 'light mode' : 'dark mode'}
        </button>
      </header>
      <div className='Todo-list'>
        <List
          uncompletedItems={uncompletedItems}
          completedItems={completedItems}
          darkMode={darkMode}
          refresh={() => setDummy(!dummy)}
        />
      </div>
    </div>
  );
}

export default App;