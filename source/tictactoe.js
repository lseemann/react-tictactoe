import { tttUI } from './App';

function Board (size) {
  var spots = [],
      characters = [null, 'X', 'O'], // Can be set by user.
      humanity = [null, true, false], // Is the respective player a human? Can be set by user.
      turn = 1, // Either 1 or 2.
      goesFirst = 1, // Either 1 or 2.
      winner = 0, // Either 0 (for an unfinished game or draw), 1 or 2.
      winningSet = []; // Will be populated once there’s a winner

  this.getSpots = function() {
    return spots;
  }

  this.getSize = function() {
    return size;
  }

  this.setTurn = function(player) {
    turn = player;
  }

  this.toggleTurn = function() {
    turn = turn === 1 ? 2 : 1;
  }

  this.getCharacters = function() {
    return characters;
  }

  this.setCharacters = function(p1, p2) {
    characters = [ null, p1, p2 ];
  }

  this.setHumanity = function(p1, p2) {
    humanity = [ null, p1, p2 ];
  }

  this.setGoesFirst = function(player) {
    goesFirst = player;
  }

  this.setOwner = function(spot, owner) {
    spots[spot] = owner;
  }

  this.currentPlayerIsComputer = function() {
    return !humanity[turn];
  }

  this.gameIsOver = function() {
    return this.getOpenSpots().length === 0 || this.hasWinner();
  }

  // Returns false if game is incomplete or a draw
  this.hasWinner = function() {
    return winner > 0;
  }

  this.getWinner = function() {
    return winner;
  }

  // Return an array of the spots that are still unoccupied.
  this.getOpenSpots = function() {
    // Create an array of all possible indices, based on size of board.
    var openSpots = Array.apply(null, {length: (size * size)}).map(Number.call, Number)
    // Return an array of indices whose spots are open
    return openSpots.filter(function(spot) { return spots[spot] === 0 });
  }

  // Reset the configuration of the board and commence play.
  this.startGame = function() {
    spots = Array(size * size).fill(0), // Creates an array of 0 values, one for each spot on the board.
                 // Each spot starts as 0 but will change to 1 or 2,
                 // depending on who plays there.
    winner = 0,
    winningSet = [],
    turn = goesFirst;
    tttUI.drawBoard();
    tttUI.goToNextTurn(turn);
  }

  this.makeMove = function(spot) {
    this.setOwner(spot, turn);
    tttUI.drawBoard();
    this.checkGameStatus();
    if (this.gameIsOver()) {
      winner === 0 ? tttUI.announceDraw() : tttUI.announceWin(winningSet, winner)
    }
    else {
      this.toggleTurn()
      tttUI.goToNextTurn(turn);
    }
  }

  // Check to see if there is a winner yet. If there is (or if there’s a draw)
  // update the values of winner and winningSet.
  this.checkGameStatus = function() {
    this.getWinningSets().forEach( function(set){
      var setHasWinner = true;
      // Check to see if each position in this set has the same owner
      // (and confirm it's not unplayed)
      for (var i = 0; i + 1 < size; i++) {
        if (spots[set[i]] !== spots[set[i+1]] || spots[set[i]] === 0) {
          setHasWinner = false
          break;
        }
      };

      // If that's the case, set the values of winner and winningSet
      if (setHasWinner) {
        winner = spots[set[0]];
        winningSet = set;
      }
    })
  }

  this.getBestMove = function() {
    // For the sake of speed and user experience, let's return random or
    // pre-determined moves for the first and second move of the game, respectively
    if (this.getOpenSpots().length === (size * size)) {
      return getRandomMove();
    }
    if (this.getOpenSpots().length === (size * size - 1) && size == 3) {
      return getBestSecondMove();
    }

    // If it's 0’s turn, we seek the move with the lowest value.
    // If it's 1’s turn, we seek the move with the highest.
    var bestMove,
        openSpots = this.getOpenSpots(),
        bestValue = turn === 1 ? 99999999 : -99999999;

    for (var i = openSpots.length - 1; i >= 0; i--) {
      var move = openSpots[i],
          moveValue = this.valueOfPlay(move)
      if (turn == 1 && moveValue < bestValue ||
          turn == 2 && moveValue > bestValue) {
        bestValue = moveValue;
        bestMove = move;
      }
    }
    return bestMove;
  }

  // Returns a lower (negative) value for moves that favor Player 1,
  // a higher value for moves that favor Player 2
  this.valueOfPlay = function(move) {
    var tempBoard = this.cloneBoard(),
        score     = 0,
        weight    = tempBoard.getOpenSpots().length + 1; // Give more weight to
                                                         // winning moves that occur earlier.

    tempBoard.setOwner(move, turn)
    tempBoard.checkGameStatus();

    if (tempBoard.gameIsOver()) {
      if (tempBoard.getWinner() === 1) {
        score -= weight;
      }
      else if (tempBoard.getWinner() === 2){
        score += weight;
      }
      tempBoard = null;
      return score;
    }
    else {
      tempBoard.toggleTurn()
      score += tempBoard.valueOfPlay(tempBoard.getBestMove());
    }
    return score
  }

  // Used as we recursively explore possible outcomes, this copies the state of the board
  // into another temporary board so it can be tested non-destructively.
  this.cloneBoard = function() {
    var newBoard = new Board(size);
    for (var i = spots.length - 1; i >= 0; i--) {
      newBoard.setOwner(i, spots[i]);
    };
    newBoard.setTurn(turn);
    return newBoard;
  }

  function getRandomMove() {
    return Math.floor(Math.random() * (size * size - 1));
  }

  function getBestSecondMove() {
    var bestSecondMoves = [4, 0, 4, 0, 0, 8, 4, 6, 4],
        firstMove;

    firstMove = spots.indexOf(1) >= 0 ? spots.indexOf(1) : spots.indexOf(2);

    return bestSecondMoves[firstMove];
  }

  // Helper function to determine winning sets for the board,
  // depending on its size.
  this.getWinningSets = function() {

    return getRows(size).concat(getCols(size)).concat(getDiags(size));

    function getRows(size) {
      var rows = [];
      for (var i = 0; i < size; i++) {
        var row = [];
        for (var j = 0; j < size; j++) {
          row.push(j + i * size);
        };
        rows.push(row);
      };
      return rows;
    }

    function getCols(size) {
      var cols = [];
      for (var i = 0; i < size; i++) {
        var col = []
        for (var j = 0; j < size; j++) {
          col.push(j * size + i);
        };
        cols.push(col);
      };
      return cols;
    }

    function getDiags(size) {
      var diag1 = [],
          diag2 = [];
      for (var i = 0; i < size; i++) {
        diag1.push(i * (size + 1));
        diag2.push((i + 1) * (size - 1));
      }
      return [diag1, diag2]
    }
  }

}

/*=====  End of Board()  ======*/

export default Board;