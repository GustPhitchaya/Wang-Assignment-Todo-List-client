import React from "react";
import './Item.css';
import AddField from "./AddField";

function Task(props) {
  const _id = props._id;
  const title = props.title;
  const onChange = props.onChange;
  const checked = props.checked;

  return (
    <label htmlFor={_id}>
      <input type="checkbox" id={_id} checked={checked} value={title} onChange={onChange} />
      {title}
    </label>
  )
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
      editing: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  // -------- handle ---------
  handleMouseOver() {
    // console.log('hover');
    this.setState({
      mouseOver: true,
    })
  }

  handleMouseLeave() {
    // console.log('mouse leave');
    this.setState({
      mouseOver: false,
    })
  }

  handleEditClick() {
    this.setState({
      editing: true,
    })
  }

  handleEditSubmit(updatedItem) {
    this.props.onSubmitEdit(updatedItem);

    this.setState({
      mouseOver: false,
      editing: false,
    })
  }

  // ------- render --------
  renderTask() {
    return (
      <div>
        <Task
          _id={this.props._id}
          title={this.props.title}
          due={this.props.due}
          checked={this.props.isDone}
          onChange={() => this.props.onCheck()}
        />
        {this.renderDue()}
        {this.renderEditButton()}
        {this.renderDeleteButton()}
      </div>
    )
  }

  renderDescription() {
    if (this.state.mouseOver) {
      return <div>Description: {this.props.description}</div>
    }
  }

  renderDue() {
    return <span className="dueDate"> Due: {this.props.due}</span>
  }

  renderEditButton() {
    if (this.state.mouseOver) {
      return (
        <button className="button" onClick={this.handleEditClick}>
          edit
        </button>
      )
    }
  }

  renderDeleteButton() {
    if (this.state.mouseOver) {
      return (
        <button className="button" onClick={this.props.onClickDelete}>
          delete
        </button>
      )
    }
  }
  render() {
    if (!this.state.editing) {
      return (
        <div className="item" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
          {this.renderTask()}
          {this.renderDescription()}
        </div>
      );
    } else {
      return (
        <AddField
          onSubmit={updatedItem => this.handleEditSubmit(updatedItem)}
          isButton={false}
          _id={this.props._id}
          title={this.props.title}
          description={this.props.description}
          due={this.props.due}
          isDone={this.props.isDone}
          editing={true}
        />
      )
    }
  }
}

export default Item;