import React, { useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import List from './List.js';

import './App.css';

const databaseAPI = 'http://localhost:9000/mongo';

function App() {
  const [uncompletedItems, setUncompletedItems] = useState(null);
  const [completedItems, setCompletedItems] = useState(null);
  const [dummy, setDummy] = useState(false);

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  function handleClick() {
    const newTheme = (theme === 'light') ? 'dark' : 'light';
    setTheme(newTheme);
  }

  function fetchItems() {
    fetch(databaseAPI + '/uncompleted')
      .then(res => res.json())
      .then(items => setUncompletedItems(items))
      .catch(err => console.log(err));

    fetch(databaseAPI + '/completed')
      .then(res => res.json())
      .then(items => setCompletedItems(items))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchItems();
  }, [dummy]);

  return (
    <div className='App' data-theme={theme}>
      <header className='App-header'>
        <p>To-Do List</p>
        <button onClick={handleClick}>
          {(theme === 'dark') ? 'light mode' : 'dark mode'}
        </button>
      </header>
      <div className='Todo-list'>
        <List
          uncompletedItems={uncompletedItems}
          completedItems={completedItems}
          theme={theme}
          refresh={() => setDummy(!dummy)}
        />
      </div>
    </div>
  );
}

export default App;