import React, {Component, PropTypes} from 'react';
import moment from 'moment-timezone';
import styles from './GameTile.scss';

export default
class GameTile extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    releasedate: PropTypes.string,
    onButton: PropTypes.func,
    onClick: PropTypes.func,
  }

  render() {
    const {id, name, price, releasedate, onButton, onClick} = this.props;
    const parsedTime = moment(releasedate).format('LL');

    return (
      <div onClick={ev => onClick(ev)} data-gameid={id} className={styles.gameTile}>
        <img src="http://placehold.it/200x150" />
        <div className={styles.body}>
          <h3 data-gameid={id}>{name}</h3>
          <small data-gameid={id}>{parsedTime}</small>
        </div>
        <div className={styles.footer}>
          <small data-gameid={id}>&euro;{price}</small>
          <button type="button" data-gameid={id} className="btn btn-primary" onClick={() => onButton(id)}>+<div className="glyphicon glyphicon-shopping-cart"></div></button>
        </div>
      </div>
    );
  }
}
