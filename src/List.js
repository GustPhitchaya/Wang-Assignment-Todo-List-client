import React from 'react';
import AddField from './AddField';
import Item from './Item';

const databaseAPI = 'http://localhost:9000/mongo';

class List extends React.Component {
  // ---------------- api ------------------
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

  async editItem(item) {
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

  // ---------------- renders ------------------
  
  renderItem(item) {
    return (
      <>
        <Item
          _id={item._id}
          title={item.title}
          description={item.description}
          due={item.due}
          isDone={item.isDone}
          onClickDelete={() => this.deleteItem(item)}
          onCheck={() => this.handleCheck(item)}
          onSubmitEdit={newItem => this.editItem(newItem)}
          darkMode={this.props.darkMode}
          />
      </>
    );
  }

  renderList() {
    if (this.props.uncompletedItems) {
      const items = this.props.uncompletedItems.slice();
      return items.map(item =>
          <li key={item._id} className="uncompletedItem">
            {this.renderItem(item)}
          </li>
        );
    }
  }

  renderAddField() {
    return (
      <li key="add-field-key">
        <AddField
          onSubmit={newItem => this.addNewItem(newItem)}
          isButton={true}
          editing={false}
          darkMode={this.props.darkMode}
        />
      </li>
    );
  }

  renderCompletedList() {
    if (this.props.completedItems) {
      const items = this.props.completedItems.slice();
      return items.map(item => 
          <li key={item._id} className="completedItem">
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
        {this.renderCompletedList()}
      </ul>
    )
  }
}

export default List;