import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { SortGames, Banner, GameList, GameDetail } from 'components';
import * as homeActions from 'redux/modules/home';

@connect(
  state => (
    {
      games: state.home.games,
      game: state.home.game,
      user: state.auth.user
    }),
    homeActions
  )
export default
class Home extends Component {
  static propTypes = {
    user: PropTypes.object,
    game: PropTypes.object,
    games: PropTypes.array,
    getGame: PropTypes.func,
    getGameList: PropTypes.func,
    unloadGame: PropTypes.func,
    addItemToCart: PropTypes.func,
  }

  static defaultProps = {
    user: {}
  }

  componentWillMount() {
    if (!this.props.games) this.props.getGameList();
  }

  render() {
    // require the logo image both from client and server
    const commercialImg1 = require('./commercial_img_1.png');
    const commercialImg2 = require('./commercial_img_2.jpg');
    const commercialImg3 = require('./commercial_img_3.jpg');

    const {game, games, getGame, getGameList, unloadGame, addItemToCart, user} = this.props;

    return game ? <GameDetail game={game} unloadGame={unloadGame} /> :
      <div className="container">

        <div className="row">
          <div className="col-lg-12"><h1>Games</h1></div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <SortGames />
          </div>
          <div className="col-lg-10">

              <div>
                <Banner />
                <div className="row">
                  <div className="col-lg-9">
                    <div className="row">
                      <div className="col-lg-6"><img src={commercialImg1} /></div><div className="col-lg-6"><img src={commercialImg2} /></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12"><GameList games={games} getGame={getGame} getGameList={getGameList} addItemToCart={addItemToCart} user={user}/></div>
                    </div>
                  </div>
                  <div className="col-lg-3"><img src={commercialImg3} /></div>
                </div>
              </div>

          </div>
        </div>
      </div>;
  }
}
