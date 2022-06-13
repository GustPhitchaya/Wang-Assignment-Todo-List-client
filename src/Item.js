import React from "react";
import './Item.css';

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
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

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

  blankspace() {
    return <span>&nbsp;&nbsp;</span>;
  }

  renderTitle() {
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

  renderDeleteButton() {
    if (this.state.mouseOver) {
      return (
        <button id={this.props._id} className="deleteButton" onClick={this.props.onClickDelete}>
          delete
        </button>
      )
    }
  }
  render() {
    return (
      <div className="item" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        {this.renderTitle()}
        {this.renderDescription()}
      </div>
    );
  }
}

export default Item;