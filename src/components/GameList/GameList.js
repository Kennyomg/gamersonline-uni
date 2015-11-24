import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment-timezone';

export default
class GameList extends Component {
  static propTypes = {
    user: PropTypes.object,
    games: PropTypes.array,
    getGame: PropTypes.func,
    getGameList: PropTypes.func,
    addItemToCart: PropTypes.func,
  }

  loadDetail(ev) {
    this.props.getGame(ev.target.dataset.gameid);
  }

  addItem(ev) {
    this.props.addItemToCart(this.props.user, ev.target.dataset.gameid);
  }

  render() {
    const styles = require('./GameList.scss');

    const {games} = this.props;
    return (
        <div>
          <span><b>Laatste Releases</b> | <Link to="/">alles weergeven</Link></span><br />
          {
            (games) ? games.map(({id, name, price, releasedate}) => {
              const parsedTime = moment(releasedate).format('LL');
              return (
                <div onClick={::this.loadDetail} data-gameid={id} className={styles.gameTile}>
                  <h3 data-gameid={id}>{name}</h3>
                  <small data-gameid={id}>&euro;{price}</small><br/>
                  <small data-gameid={id}>{parsedTime}</small>
                  <button type="button" data-gameid={id} className="btn btn-primary" onClick={::this.addItem}>+<div className="glyphicon glyphicon-shopping-cart"></div></button>
                </div>
              );
            })
            : ''
          }
          <span><b>Verwacht</b> | <Link to="/">alles weergeven</Link></span><br />
          <span><b>Deals en aanbiedingen</b> | <Link to="/">alles weergeven</Link></span><br />
          <span><b>Meest gekocht</b> | <Link to="/">alles weergeven</Link></span>
        </div>
    );
  }
}
