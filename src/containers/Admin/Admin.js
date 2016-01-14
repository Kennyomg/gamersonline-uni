import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { createGame, updateGame, deleteGame, openSpecialCheckbox, addSpecialEdition } from 'redux/modules/admin';
import { getGame, getGameList } from 'redux/modules/home';

@connect(
    state => (
      {
        games: state.home.games,
        game: state.home.game,
        user: state.auth.user,
        admin: state.admin,
      }),
    { createGame, updateGame, deleteGame, openSpecialCheckbox, addSpecialEdition, getGame, getGameList }
)
export default
class Admin extends Component {
  static propTypes = {
    game: PropTypes.object,
    admin: PropTypes.object,
    createGame: PropTypes.func,
    updateGame: PropTypes.func,
    deleteGame: PropTypes.func,
    games: PropTypes.array,
    getGame: PropTypes.func,
    getGameList: PropTypes.func,
    openSpecialCheckbox: PropTypes.func,
    addSpecialEdition: PropTypes.func,
  };

  componentDidMount() {
    this.props.getGameList();
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const inputImage = this.refs.image.files[0];
    const reader = new FileReader();
    const inputName = this.refs.name;
    const inputDescription = this.refs.description;
    const inputPrice = this.refs.price;
    const inputReleasedate = this.refs.releasedate;

    reader.onload = (upload) => {
      this.props.createGame(inputName.value, inputDescription.value, inputPrice.value, inputReleasedate.value, upload.target.result);
      this.refs.name.value = '';
      this.refs.description.value = '';
      this.refs.price.value = '';
      this.refs.releasedate.value = '';
    };
    reader.readAsDataURL(inputImage);
  }

  handleSpecialSubmit(ev, gameid) {
    ev.preventDefault();
    const inputImage = this.refs.specialImage.files[0];
    const reader = new FileReader();

    reader.onload = (upload) => {
      this.props.addSpecialEdition(gameid, this.refs.specialAmount.value, this.refs.specialPrice.value, upload.target.result);
      this.refs.specialAmount.value = '';
      this.refs.specialPrice.value = '';
      this.refs.specialImage.value = '';
    };
    reader.readAsDataURL(inputImage);
  }

  handleCheckbox(ev, gameid) {
    console.log(gameid);
    if (ev.target.checked == true) { //eslint-disable-line
      this.props.openSpecialCheckbox(`gameid-${gameid}`);
    }
  }

  render() {
    const {games, admin: { openedCheckboxes }} = this.props;
    const styles = require('./Admin.scss');

    return (
      <div className={styles.adminPage + ' container'}>
        <h1>Admin Page!</h1>

        <div className="row">
          <form className="create-game-form" encType="multipart/form-data">
            <input type="text" ref="name" placeholder="Name"/>
            <input type="text" ref="description" placeholder="Description"/>
            <input type="number" ref="price" placeholder="Price"/>
            <input type="date" ref="releasedate" placeholder="releasedate"/>
            <div className="label">Image:</div><input type="file" ref="image" style={{display: 'inline-block'}} />
            <button type="button" className="btn btn-success" onClick={::this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Create Game
            </button>
          </form>
        </div>
        { (games) ? games.map(({id, name, price}) => {
          if (openedCheckboxes && openedCheckboxes.indexOf(`gameid-${id}`) > -1) {
            return (
              <div className="row">
                <h3>{name}</h3>
                <form className="create-game-form" encType="multipart/form-data">
                  <input type="number" ref="specialAmount" placeholder="Stock Amount"/>
                  <input type="number" ref="specialPrice" min={price} placeholder="Price"/>
                  <div className="label">Image:</div><input type="file" ref="specialImage" name="specialImage" id="specialImage" style={{display: 'inline-block'}} />
                <button type="button" className="btn btn-success" onClick={(ev) => ::this.handleSpecialSubmit(ev, id)}><i className="fa fa-sign-in"/>{' '}Create Special Edition
                  </button>
                </form>
              </div>
            );
          }
        })
        : ''
        }
        <div className="row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Releasedate</th>
                <th>Special Edition</th>
              </tr>
            </thead>
            <tbody>
              { (games) ? games.map(({id, name, description, price, releasedate, SpecialEdition}) => {
                return (
                  <tr>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{price}</td>
                    <td>{releasedate}</td>
                    {
                      ((moment(releasedate) > moment()) && (moment(releasedate).diff(moment(), 'days') > 7) && !SpecialEdition) ? (
                        <td><div className={`checkbox ${styles.checkbox}`}><input type="checkbox" name="specialEdition" data-gameid={id} value="" onChange={(ev) => ::this.handleCheckbox(ev, id)} /></div></td>
                      ) : (
                        <td><div className={`checkbox disabled ${styles.checkbox}`}><input type="checkbox" name="specialEdition" value="" disabled/></div></td>
                      )
                    }
                  </tr>
                );
              })
              : ''
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
