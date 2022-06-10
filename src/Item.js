import React from "react";
import './Item.css';

function Description(props) {
  const id = props.id;
  const desc = props.desc;

  return (
    <form className="description">
      <input type='checkbox' id={id} value={desc} />
      <label htmlFor={id}>{desc}</label>
    </form>
  )
}

function DeleteButton(props) {
  return (
    <button id={props.id} className="delButton" onClick={props.onClick}>
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
      <Description
        id={this.props.id}
        desc={this.props.desc}
      />
    )
  }

  renderDeleteButton() {
    if (this.state.mouseOver) {
      return (
        <DeleteButton
          id={this.props.id}
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