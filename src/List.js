import React from 'react';
import AddField from './AddField';
import Item from './Item';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemNumber: 0,
    };
  }

  addNewItem(newItem) {
    // const items = this.state.items.slice();
    // const itemNumber = this.state.itemNumber;
    // this.setState({
    //   items: items.concat([{
    //     id: itemNumber + 1,
    //     desc: newItem,
    //   }]),
    //   itemNumber: itemNumber + 1,
    // });
    fetch('http://localhost:9000/mongo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then(res => res.json())
    .then(newItem => console.log('successfully added' + newItem))
    .catch(err => console.log(err));
  }

  renderAddField() {
    return (
      <AddField
        onAddItem={newItem => this.addNewItem(newItem)}
      />
    );
  }

  deleteItem(id) {
    const items = this.state.items.slice();
    this.setState({
      items: items.filter(item => item.id !== id),
    });
  }

  renderItem(item) {
    return (
      <>
        <Item
          id={item._id}
          desc={item.name}
          onClickDelete={() => this.deleteItem(item._id)}
        />
      </>
    );
  }

  renderList() {
    const items = this.props.items.slice();
    return items.map(item =>
      <li key={item.id} className='Item'>
        {this.renderItem(item)}
      </li>
    );
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