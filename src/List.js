import React from 'react';
import AddField from './AddField';
import Item from './Item';

const databaseAPI = 'http://localhost:9000/mongo';

class List extends React.Component {
  async addNewItem(newItem) {
    await fetch(databaseAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then(res => res.text())
      .catch(err => console.log(err));

    this.props.refresh();
  }

  async deleteItem(item) {
    await fetch(databaseAPI, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(res => res.text())
      .catch(err => console.log(err));

    this.props.refresh();
  }

  async handleCheck(item) {
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

    this.props.refresh();
  }

  renderAddField() {
    return (
      <li key="add-field-key">
        <AddField
          onAddItem={newItem => this.addNewItem(newItem)}
        />
      </li>
    );
  }

  renderItem(item) {
    return (
      <>
        <Item
          _id={item._id}
          description={item.description}
          due={item.due}
          isDone={item.isDone}
          onClickDelete={() => this.deleteItem(item)}
          onCheck={() => this.handleCheck(item)}
        />
      </>
    );
  }

  renderList() {
    if (this.props.items) {
      const items = this.props.items.slice();
      return items.map(item =>
        <li key={item._id} className='Item'>
          {this.renderItem(item)}
        </li>
      );
    }
  }

  render() {
    return (
      <ul className='List'>
        {this.renderList()}
        {this.renderAddField()}
      </ul>
    )
  }
}

export default List;