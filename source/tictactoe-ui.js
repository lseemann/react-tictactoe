
/*----------  Functions pertaining to the UI  ----------*/

function tttUI() {
  this.displayMessage = message => this.setState({announcement: message});

  this.clearMessage = () => this.setState({announcement: ''});

  this.announceDraw = () => {
      this.setState({gameOver: false});
      displayMessage('Draw');
  }
}


  announceWin: function(winningSet, winner) {
    document.getElementById('ttt-table').classList.add('game-over');
    winningSet.forEach( function(spot) {
      document.getElementById('pos-' + spot).classList.add('winner')
      document.getElementById('pos-' + spot).classList.add('winner-' + winner)
    })
    tttUI.displayMessage('Player ' + winner + ' has won!')
  },

  // // Take the settings from the user and, if valid, apply them to the board.
  // // Then, hide the settings, reveal the board, and commence play.
  // loadBoard: function() {
  //   // var p1_identity  = document.querySelector('input[name="p1-identity"]:checked').value,
  //   //     p2_identity  = document.querySelector('input[name="p2-identity"]:checked').value,
  //   //     p1_character = document.getElementById('p1-character').value.charAt(0),
  //   //     p2_character = document.getElementById('p2-character').value.charAt(0),
  //   //     error        = this.validateCharacters(p1_character, p2_character);

  //   // if (error) {
  //   //   this.displayMessage('<span class="error">' + error + '</span>');
  //   // }
  //   // else {
  //   //   if (document.querySelector('input[name="goes-first"]:checked').value === 'p2') {
  //   //     board.setGoesFirst(2);
  //   //   }

  //   //   board.setCharacters(p1_character, p2_character)
  //   // board.setHumanity(p1_identity === "human", p2_identity === "human")

  //   //   document.getElementById('ttt-options').style.display = 'none';
  //   //   document.getElementById('ttt-arena').style.display = 'block';
  //     board.setGoesFirst(1)
  //     board.setCharacters('X','O');
  //     board.setHumanity(true,false);
  //     board.startGame();
  //   // }
  // },

  // drawBoard: function(spots, characters, openSpots, size) {
  //   var characters = board.getCharacters(),
  //       openSpots  = board.getOpenSpots(),
  //       size       = board.getSize(),
  //       spots      = board.getSpots();

  //   spotsByCharacter = spots.map((player) => characters(player));




  //   // this.clearMessage()
  //   // for (var i = spots.length - 1; i >= 0; i--) {
  //   //   document.getElementById('pos-' + i).innerHTML = characters[spots[i]] || '&nbsp;';
  //   //   if (spots[i] !== 0) {
  //   //     document.getElementById('pos-' + i).className += " taken";
  //   //   }
  //   // }
  //   // // If this is an empty board, reset a few things.
  //   // if (openSpots.length === (size * size)) {
  //   //   document.getElementById('reset-button').classList.remove('active');
  //   //   document.getElementById('ttt-table').classList.remove('game-over');
  //   //   this.removeClass('taken');
  //   //   this.removeClass('winner');
  //   //   this.removeClass('winner-1');
  //   //   this.removeClass('winner-2');
  //   // }
  //   // else {
  //   //   document.getElementById('reset-button').classList.add('active');
  //   // }
  // },

  // selectMove: function(spot) {
  //   // Prevent a sneaky move from being made on computer's turn.
  //   if (board.getOpenSpots().indexOf(spot) >= 0 && board.getWinner() === 0 && board.currentPlayerIsComputer() === false) {
  //     board.makeMove(spot);
  //   }
  // },

  // goToNextTurn: function(turn) {
  //   // If it's now a computer's turn, find the best move and make it.
  //   if (board.currentPlayerIsComputer()) {
  //     // var that = this;
  //     // Give it a delay so we can observe things happening.
  //     setTimeout(function () {
  //       board.makeMove(board.getBestMove());
  //     }, 200)
  //   }
  //   // If it’s a human’s turn, prompt her.
  //   else {
  //     this.displayMessage(this.getPrompt(turn))
  //   }
  // },

  // getPrompt: function(turn) {
  //   return 'Player ' + turn + ', it is your turn.';
  // },

  // showOptions: function() {
  //   this.displayMessage('Please choose from the following options for your game:');
  //   document.getElementById('ttt-options').style.display = 'block';
  //   document.getElementById('ttt-arena').style.display = 'none';
  // },

  // removeClass: function(classname) {
  //   var els = document.getElementsByClassName(classname);
  //   while (els.length > 0) {
  //     els[0].classList.remove(classname);
  //   }
  // },

  // validateCharacters: function(characterA, characterB) {
  //   if (characterA.length === 0) {
  //     return 'Player 1 needs a character.';
  //   }
  //   if (characterB.length === 0) {
  //     return 'Player 2 needs a character.';
  //   }
  //   if (characterA === characterB) {
  //     return 'It looks like both players have the same character. Please change one.'
  //   }
  //   return false;
  // }


/*=====  End of tttUI  ======*/

export default tttUI;