import React from "react";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseEnter: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  renderDeleteButton() {
    <button>
      delete
    </button>
  }

  handleMouseOver() {
    console.log('hover');
    this.setState({
      mouseEnter: true,
    })
  }

  render() {
    const id = this.props.id;
    const desc = this.props.desc;

    return (
      <>
        <form>
          <input type='checkbox' id={id} value={desc} />
          <label htmlFor={id} onMouseOver={this.handleMouseOver}>{desc}</label>
        </form>
        {this.renderDeleteButton()}
      </>
    );
  }
}

export default Item;