import React, { Component, PropTypes } from 'react';
import Spot from './spot';
import TTTButton from './tttbutton';

class Board extends Component {
  render() {
    let spots = this.props.board.map((player,i) => (
      <Spot characters = { this.props.characters }
            column     = { i % this.props.size }
            key        = { i }
            player     = { player }
            position   = { i }
            row        = { (i - i % this.props.size) / this.props.size}
            selectMove = {this.props.selectMove}
            winningSet = {this.props.winningSet} />
      ));

    let gameOver = this.props.gameOver === true ? 'game-over' : '';

    let openSpotsCount = this.props.board.filter((player) => player == '0').length;

    let active = openSpotsCount === 9 ? '' : 'active'

    return (
      <div>
        <div id="board" className={ gameOver }>
          { spots }
        </div>
        <TTTButton active = {active} action = {this.props.startgame} text = "Restart game" />
        <TTTButton active = "active" action = {this.props.reconfigure} text = "Reconfigure game" />
      </div>
      )
  }
}

Board.propTypes = {
  board      : PropTypes.arrayOf(PropTypes.number).isRequired,
  characters : PropTypes.arrayOf(PropTypes.string).isRequired,
  gameOver   : PropTypes.bool.isRequired,
  selectMove : PropTypes.func.isRequired,
  size       : PropTypes.number.isRequired,
  winningSet : PropTypes.arrayOf(PropTypes.number).isRequired
}

export default Board;