import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import * as cartActions from 'redux/modules/cart';
import { GameTile } from 'components';

@connect(
  state => (
    {
      cart: state.cart.cart,
      user: state.auth.user
    }),
    cartActions
  )
export default
class Cart extends Component {
  static propTypes = {
    user: PropTypes.object,
    cart: PropTypes.array,
    getCart: PropTypes.func,
    removeItem: PropTypes.func,
    checkout: PropTypes.func,
  }

  static defaultProps = {
    user: {},
    cart: [],
  }

  componentDidMount() {
    if (this.props.user) this.props.getCart(this.props.user.id);
  }

  removeItem(gameid) {
    this.props.removeItem(this.props.user.id, gameid);
  }

  checkout() {
    this.props.checkout(this.props.user.id);
  }

  render() {
    // require the logo image both from client and server
    const { cart, user } = this.props;
    let payNow = false;

    return (
      <div className="container">
        <h1>Winkelwagen</h1>
        {
        (user) ? (
          <div>
            <div className="row">
              {
                cart.map(({id, name, price, releasedate, SpecialEdition}) => {
                  if (SpecialEdition) {
                    payNow = true;
                  }
                  return <GameTile onClick={()=>{}} onButton={::this.removeItem} id={id} name={name} price={price} releasedate={releasedate} specialEdition={SpecialEdition} deleteItem />;
                })
              }
            </div>
            <div className="row">
              {
                (payNow) ? (
                  <div>
                    <span>U kunt geen pre-order plaatsen voor speciale edities.</span>
                    <button type="button" className="btn btn-primary" onClick={::this.checkout} style={{float: 'right'}}>Betaal Direct</button>
                  </div>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={::this.checkout} style={{float: 'right'}}>Bestel</button>
                )
            }
            </div>
          </div>
        ) : (
          <div className="row">
            U moet zich <Link to="/login">inloggen</Link> om producten toe te kunnen voegen aan uw winkelwagen
          </div>
        )
        }
      </div>
    );
  }
}
