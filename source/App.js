import React, { Component } from 'react';
import { render } from 'react-dom';
import TTTBoard from './tictactoe';
import Announcement from './announcement';
import Board from './board';
import Configuration from './configuration';

let tttUI;

class TTTContainer extends Component {
  constructor() {
    super();

    this.board = new TTTBoard(3);

    this.state = {
      size: 3,
      announcement: 'Welcome to Tic-Tac-Toe',
      characters: [null, 'X', 'O'],
      configError: false,
      configMode: true,
      errorMessage: '',
      gameOver: false,
      humanity: [null, true, false], // [stub, player 1, player 2]
      board: [],
      winningSet: [],
      winner: null
    }

    this.startgame = this.startgame.bind(this);
    this.configureHumanity = this.configureHumanity.bind(this);
    this.configureCharacters = this.configureCharacters.bind(this);
    this.reconfigure = this.reconfigure.bind(this);

    tttUI = this.tttUI = {
      displayMessage : (message) => this.setState({announcement: message}),

      clearMessage : () => this.setState({announcement: ''}),

      announceDraw : () => {
          this.setState({gameOver: true,
                         announcement: 'Draw!'});
      },

      announceWin: (winningSet, winner) => {
        this.setState({gameOver: true,
                       announcement: `Player ${winner} has won!`,
                       winningSet: winningSet,
                       winner: winner})
      },

      drawBoard: () => {
        this.setState({board: this.board.getSpots(),
                       characters: this.board.getCharacters()})
      },

      selectMove: (spot) => {
        // Prevent a sneaky move from being made on computer's turn.
        if (this.board.getOpenSpots().indexOf(spot) >= 0 && this.board.getWinner() === 0 && this.board.currentPlayerIsComputer() === false) {
          this.board.makeMove(spot);
        }
      },

      goToNextTurn: (turn) => {
        // If it's now a computer's turn, find the best move and make it.
        if (this.board.currentPlayerIsComputer()) {
          // Give it a delay so we can observe things happening.
          setTimeout(() => {
            this.board.makeMove(this.board.getBestMove());
          }, 200)
        }
        // If it’s a human’s turn, prompt her.
        else {
          tttUI.displayMessage( 'Player ' + turn + ', it is your turn.')
        }
      }
    }
  }

  startgame() {
    this.setState({
      winner: null,
      winningSet: [],
      gameOver: false,
      configMode: false
    })
    this.board.setGoesFirst(1)
    this.board.setCharacters(
      this.state.characters[1].length === 1 ? this.state.characters[1] : 'X',
      this.state.characters[2].length === 1 ? this.state.characters[2] : 'O'
      );
    this.board.setHumanity(this.state.humanity[1], this.state.humanity[2]);
    this.board.startGame();
  }

  configureHumanity(e) {
    let oldHumanity = this.state.humanity;
    if (e.target.name.substring(0,2) == 'p1') {
      this.setState({humanity : [null,
        e.target.name === 'p1-human',
        oldHumanity[2]
        ]})
    }

    if (e.target.name.substring(0,2) == 'p2') {
      this.setState({humanity : [null,
        oldHumanity[1],
        e.target.name === 'p2-human'
        ]})
    }
  }

  configureCharacters(e) {
    let whichPlayer = parseInt(e.target.name.substring(1,2));
    let characters = this.state.characters.slice();
    characters[whichPlayer] = e.target.value;
    this.setState({characters: characters})

    if (characters[1] === characters[2]) {
      this.setState({configError : true,
                     errorMessage : 'Player characters should be different.'
      })
    }
    else {
      this.setState({configError : false})
    }
  }

  reconfigure() {
    this.setState({
      announcement: ' ',
      configMode: true
    })
  }

  render() {
    let message = this.state.winner == null ? this.state.announcement : `${this.state.characters[this.state.winner]} has won!`;
    return (
      <div id="outer">
        <Announcement text = {this.state.announcement}
                      winner = {this.state.winner}/>
        {this.state.configMode === true ?
          <Configuration characters = {this.state.characters}
                         configureCharacters = {this.configureCharacters}
                         configError = {this.state.configError}
                         configureHumanity = {this.configureHumanity}
                         errorMessage = {this.state.errorMessage}
                         humanity = {this.state.humanity}
                         startgame = {this.startgame}/>
          :
          <Board board = {this.state.board}
                 characters = {this.state.characters}
                 gameOver = {this.state.gameOver}
                 winningSet = {this.state.winningSet}
                 reconfigure = {this.reconfigure}
                 size = {this.state.size}
                 selectMove = {this.tttUI.selectMove.bind(this.tttUI)}
                 startgame={this.startgame}/>
        }

      </div>
      )
  }
}

render(<TTTContainer />, document.getElementById('root'));

export { tttUI };