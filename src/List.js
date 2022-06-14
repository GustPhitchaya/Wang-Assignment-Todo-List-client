import React from 'react';
import AddField from './AddField';
import Item from './Item';

const databaseAPI = 'http://localhost:9000/mongo';

function List(props) {
  // ---------------- api ------------------
  async function addNewItem(newItem) {
    await fetch(databaseAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then(res => res.text())
      .catch(err => console.log(err));

    props.refresh();
  }

  async function deleteItem(item) {
    await fetch(databaseAPI, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(res => res.text())
      .catch(err => console.log(err));

    props.refresh();
  }

  async function handleCheck(item) {
    item.isDone = !item.isDone;
    await fetch(databaseAPI, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(res => res.text())
      .catch(err => console.log(err));

    props.refresh();
  }

  async function editItem(item) {
    await fetch(databaseAPI, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(res => res.text())
      .catch(err => console.log(err));

    props.refresh();
  }

  // ---------------- renders ------------------

  function renderItem(item) {
    return (
      <>
        <Item
          _id={item._id}
          title={item.title}
          description={item.description}
          due={item.due}
          isDone={item.isDone}
          onClickDelete={() => deleteItem(item)}
          onCheck={() => handleCheck(item)}
          onSubmitEdit={newItem => editItem(newItem)}
          darkMode={props.darkMode}
        />
      </>
    );
  }

  function renderList() {
    if (props.uncompletedItems) {
      const items = props.uncompletedItems.slice();
      return items.map(item =>
        <li key={item._id} className="uncompletedItem">
          {renderItem(item)}
        </li>
      );
    }
  }

  function renderAddField() {
    return (
      <li key="add-field-key">
        <AddField
          onSubmit={newItem => addNewItem(newItem)}
          isButton={true}
          editing={false}
          darkMode={props.darkMode}
        />
      </li>
    );
  }

  function renderCompletedList() {
    if (props.completedItems) {
      const items = props.completedItems.slice();
      return items.map(item =>
        <li key={item._id} className="completedItem">
          {renderItem(item)}
        </li>
      );
    }
  }

  return (
    <ul className='List'>
      {renderList()}
      {renderAddField()}
      {renderCompletedList()}
    </ul>
  )
}


export default List;