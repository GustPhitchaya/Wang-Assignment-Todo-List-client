import React from "react";
import AddField from "./AddField";
import Item from "./Item";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemNumber: 0,
    };
  }

  addNewItem(newItem) {
    const items = this.state.items.slice();
    const itemNumber = this.state.itemNumber;
    this.setState({
      items: items.concat([{
        id: itemNumber + 1,
        desc: newItem,
      }]),
      itemNumber: itemNumber + 1,
    });
  }

  renderAddField() {
    return (
      <AddField
        onAddItem={newItem => this.addNewItem(newItem)}
      />
    );
  }

  handleMouseEnter() {

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
          id={item.id}
          type={item.type}
          desc={item.desc}
          onMouseEnter={() => this.handleMouseEnter}
          onClickDelete={() => this.deleteItem(item.id)}
        />
      </>
    );
  }

  renderList() {
    const items = this.state.items.slice();
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