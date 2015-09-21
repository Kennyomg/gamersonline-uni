import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default
class GameList extends Component {
  render() {
    return (
        <div>
          <span><b>Laatste Releases</b> | <Link to="/">alles weergeven</Link></span><br />
          <span><b>Verwacht</b> | <Link to="/">alles weergeven</Link></span><br />
          <span><b>Deals en aanbiedingen</b> | <Link to="/">alles weergeven</Link></span><br />
          <span><b>Meest gekocht</b> | <Link to="/">alles weergeven</Link></span>
        </div>
    );
  }
}
