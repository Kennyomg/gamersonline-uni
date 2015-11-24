import React, {Component, PropTypes} from 'react';
import moment from 'moment-timezone';

export default
class GameDetail extends Component {
  static propTypes = {
    game: PropTypes.object,
    unloadGame: PropTypes.func
  }

  handleBack() {
    this.props.unloadGame();
  }

  render() {
    const styles = require('./GameDetail.scss');
    const {name, description, price, releasedate} = this.props.game;
    const parsedTime = moment(releasedate).format('LL');
    return (
      <div className={`${styles.gameDetailPage} container`}>
        <div className={`glyphicon glyphicon-arrow-left ${styles['back-button']}`} onClick={::this.handleBack}> Back</div>
        <div className="row">
          <div className="col-lg-2">
            <h2>&euro;{price}</h2>
          </div>
          <div className="col-lg-10">
            <h2>{name}</h2>
            <h3>{parsedTime}</h3>
            <h3>Beschrijving</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}
