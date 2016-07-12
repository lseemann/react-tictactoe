import React, {Component} from 'react';

class Announcement extends Component {

  render() {
    return (
      <div id="announcement">{this.props.text}</div>
      )
  }
}

Announcement.propTypes = {
  text: React.PropTypes.string
}

export default Announcement;