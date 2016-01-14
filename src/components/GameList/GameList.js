import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import { GameTile } from 'components';

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

  addItem(gameid) {
    console.log(gameid);
    this.props.addItemToCart(this.props.user.id, gameid);
  }

  render() {
    const {games} = this.props;
    return (
        <div>
          <h4><b>Laatste Releases</b> | <Link to="/">alles weergeven</Link></h4>
          {
            (games) ? games.map(({id, name, price, releasedate}) => {
              return (
                <GameTile data-gameid={id} onClick={::this.loadDetail} onButton={::this.addItem} id={id} name={name} price={price} releasedate={releasedate} />
              );
            })
            : ''
          }
          <h4><b>Verwacht</b> | <Link to="/">alles weergeven</Link></h4>
          <h4><b>Deals en aanbiedingen</b> | <Link to="/">alles weergeven</Link></h4>
          <h4><b>Meest gekocht</b> | <Link to="/">alles weergeven</Link></h4>
        </div>
    );
  }
}
