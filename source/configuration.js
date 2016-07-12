import React, { Component, PropTypes } from 'react';
import TTTButton from './tttbutton';

class Configuration extends Component {

  render() {
    let errorMessageOrButton;
    if (this.props.configError === true) {
      errorMessageOrButton = <div className="error">{this.props.errorMessage}</div>;
    }
    else {
      errorMessageOrButton = <TTTButton active="active" action = {this.props.startgame} text = "Start game"/>;
    }

    return (
      <div id="configuration">
        <h2>Player 1</h2>
        <input type = "radio"
               checked = {this.props.humanity[1]}
               id = "p1-human"
               name = "p1-human"
               onChange = {this.props.configureHumanity} />
        <label for="p1-human">Human</label> <br />
        <input type = "radio"
               checked = {!this.props.humanity[1]}
               id = "p1-computer"
               name = "p1-computer"
               onChange = {this.props.configureHumanity} />
        <label for="p1-computer">Computer</label><br />
        <label for="p1-character">Character:</label>
        <input type = "text"
               maxLength = "1"
               name = "p1-character"
               onChange = {this.props.configureCharacters}
               size = "1"
               value = {this.props.characters[1]} />

        <h2>Player 2</h2>
        <input type = "radio"
               checked = {this.props.humanity[2]}
               id = "p1-human"
               name = "p2-human"
               onChange = {this.props.configureHumanity} />
        <label for="p2-human">Human</label> <br />
        <input type = "radio"
               checked = {!this.props.humanity[2]}
               name = "p2-computer"
               onChange = {this.props.configureHumanity}   />
        <label for="p2-computer">Computer</label><br />
        <label for="p2-characer">Character:</label>
        <input type = "text"
               maxLength = "1"
               name = "p2-character"
               size = "1"
               value = {this.props.characters[2]}
               onChange = {this.props.configureCharacters} />
        <p>&nbsp;</p>
        { errorMessageOrButton }

      </div>
    )
  }

}

export default Configuration;