import React, { Component, PropTypes } from 'react';

class TTTButton extends Component {
  render() {
    return (
      <button onClick={this.props.action} className={this.props.active}>
        {this.props.text}
      </button>
      )
  }
}

export default TTTButton;