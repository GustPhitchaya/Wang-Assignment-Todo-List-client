import React from "react";
import './Item.css';

function Task(props) {
  const _id = props._id;
  const description = props.description;
  const onChange = props.onChange;
  const checked = props.checked;

  return (
    <>
      <input type="checkbox" id={_id} checked={checked} value={description} onChange={onChange} />
      <label htmlFor={_id}>{description}</label>
    </>
  )
}

function DeleteButton(props) {
  return (
    <button id={props._id} className="delButton" onClick={props.onClick}>
      delete
    </button>
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

  renderDescription() {
    return (
      <Task
        _id={this.props._id}
        description={this.props.description}
        checked={this.props.isDone}
        onChange={() => this.props.onCheck()}
      />
    )
  }

  renderDeleteButton() {
    if (this.state.mouseOver) {
      return (
        <DeleteButton
          _id={this.props._id}
          onClick={this.props.onClickDelete}
        />
      )
    }
  }

  render() {
    return (
      <div className="item" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        {this.renderDescription()}
        {this.renderDeleteButton()}
      </div>
    );
  }
}

export default Item;