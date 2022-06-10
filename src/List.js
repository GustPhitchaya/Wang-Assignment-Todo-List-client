import React from 'react';
import AddField from './AddField';
import Item from './Item';

class List extends React.Component {
  addNewItem(newItem) {
    fetch('http://localhost:9000/mongo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then(res => res.text())
      .then(newItem => console.log('successfully added ' + newItem))
      .catch(err => console.log(err));

    this.props.refresh();
  }

  deleteItem(id) {
    const items = this.props.items.slice();
    this.setState({
      items: items.filter(item => item._id !== id),
    });
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
          id={item._id}
          desc={item.description}
          due={item.due}
          isDone={item.isDone}
          onClickDelete={() => this.deleteItem(item._id)}
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