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
  }

  static defaultProps = {
    user: {},
    cart: [],
  }

  componentDidMount() {
    if (this.props.user) this.props.getCart(this.props.user.id);
  }

  render() {
    // require the logo image both from client and server
    const { cart, user } = this.props;
    return (
      <div className="container">
        <h1>Shopping Cart</h1>
        {
        (user) ? (
          <div className="row">
            {
              cart.map(({id, name, price, releasedate}) => (
                <GameTile onClick={()=>{}} onButton={()=>{}} id={id} name={name} price={price} releasedate={releasedate} />
              ))
            }
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
