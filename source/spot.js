import React, { Component, PropTypes } from 'react';

class Spot extends Component {
  render() {
    let taken = (this.props.player == 1 || this.props.player == 2) ? 'taken' : '';

    let winner = '';
    if (this.props.winningSet.indexOf(this.props.position) >= 0) {
      winner = `winner-${this.props.player}`;
    }

    return (
        <div
          className={`spot ${'column-' + this.props.column} ${taken} ${winner} ${'row-' + this.props.row}`}
          onClick={ this.props.selectMove.bind(null, this.props.position) }
          id={'pos-' + this.props.position}
          >
          <div>
            {this.props.characters[this.props.player]}
          </div>
        </div>
      )
  }
}

Spot.propTypes = {
  characters : PropTypes.arrayOf(PropTypes.string).isRequired,
  column     : PropTypes.number.isRequired,
  player     : PropTypes.number.isRequired,
  position   : PropTypes.number.isRequired,
  row        : PropTypes.number.isRequired,
  selectMove : PropTypes.func.isRequired,
  winningSet : PropTypes.arrayOf(PropTypes.number).isRequired
}

export default Spot;