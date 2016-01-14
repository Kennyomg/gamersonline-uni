import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as adminActions from 'redux/modules/admin';

@connect(
    state => (state.admin),
    adminActions)
export default
class Admin extends Component {
  static propTypes = {
    game: PropTypes.object,
    createGame: PropTypes.func,
    updateGame: PropTypes.func,
    deleteGame: PropTypes.func
  };

  handleSubmit() {
    event.preventDefault();
    const inputName = this.refs.name;
    const inputDescription = this.refs.description;
    const inputPrice = this.refs.price;
    const inputReleasedate = this.refs.releasedate;

    this.props.createGame(inputName.value, inputDescription.value, inputPrice.value, inputReleasedate.value);
    this.refs.name.value = '';
    this.refs.description.value = '';
    this.refs.price.value = '';
    this.refs.releasedate.value = '';
  }

  render() {
    // const {game, createGame, updateGame, deleteGame} = this.props;
    const styles = require('./Admin.scss');
    return (
      <div className={styles.adminPage + ' container'}>
        <h1>Admin Page!</h1>

        <div>
          <form className="create-game-form">
            <input type="text" ref="name" placeholder="Name"/>
            <input type="text" ref="description" placeholder="Description"/>
            <input type="text" ref="price" placeholder="price"/>
            <input type="text" ref="releasedate" placeholder="releasedate"/>
            <button type="button" className="btn btn-success" onClick={::this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Create Game
            </button>
          </form>
        </div>
      </div>
    );
  }
}
