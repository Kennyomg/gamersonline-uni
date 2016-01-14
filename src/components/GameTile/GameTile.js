import React, {Component, PropTypes} from 'react';
import moment from 'moment-timezone';
import styles from './GameTile.scss';
import { setCookie, getCookie } from 'utils/cookie';

export default
class GameTile extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    releasedate: PropTypes.string,
    onButton: PropTypes.func,
    onClick: PropTypes.func,
    specialEdition: PropTypes.object,
    deleteItem: PropTypes.bool,
  }

  static defaultProps = {
    deleteItem: false,
  }

  render() {
    const { id, name, price, releasedate, onButton, onClick, deleteItem } = this.props;
    let { specialEdition } = this.props;
    const parsedTime = moment(releasedate).format('LL');

    if (!((moment(releasedate) > moment()) && (moment(releasedate).diff(moment(), 'days') > 7)) && specialEdition) {
      specialEdition = null;
    }

    if (specialEdition) {
      if (getCookie(`${name}${id}`) === '') {
        setCookie(`${name}${id}`, specialEdition.amount);
      }
    }

    return (
      <div onClick={ev => onClick(ev)} data-gameid={id} className={styles.gameTile}>
        <img src={(specialEdition) ? require(`images/${id}_special.jpg`) : require(`images/${id}_normal.jpg`)} />
        <div className={styles.body}>
          <h3 data-gameid={id}>{(specialEdition) ? `${name} - Limited` : name}</h3>
          <small data-gameid={id}>{parsedTime}</small>
        </div>
        <div className={styles.footer}>
          <small data-gameid={id}>&euro;{ (specialEdition) ? `${specialEdition.price} - nog ${getCookie(`${name}${id}`)} over` : price}</small>
          <button type="button" data-gameid={id} className="btn btn-primary" onClick={() => onButton(id)}> { (deleteItem) ? '-' : '+' } <div className="glyphicon glyphicon-shopping-cart"></div></button>
        </div>
      </div>
    );
  }
}
