import { setCookie, getCookie } from 'utils/cookie';

const GET_CART = 'redux-example/cart/GET_CART';
const GET_CART_SUCCESS = 'redux-example/cart/GET_CART_SUCCESS';
const GET_CART_FAIL = 'redux-example/cart/GET_CART_FAIL';
const REMOVE_ITEM_FROM_CART = 'redux-example/cart/REMOVE_ITEM_FROM_CART';
const REMOVE_ITEM_FROM_CART_SUCCESS = 'redux-example/cart/REMOVE_ITEM_FROM_CART_SUCCESS';
const REMOVE_ITEM_FROM_CART_FAIL = 'redux-example/cart/REMOVE_ITEM_FROM_CART_FAIL';
const CHECKOUT = 'redux-example/cart/CHECKOUT';
const CHECKOUT_SUCCESS = 'redux-example/cart/CHECKOUT_SUCCESS';
const CHECKOUT_FAIL = 'redux-example/cart/CHECKOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        loading: true
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        cart: action.result
      };
    case GET_CART_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        loading: true
      };
    case REMOVE_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        cart: action.result
      };
    case REMOVE_ITEM_FROM_CART_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case CHECKOUT:
      return {
        ...state,
        loading: true
      };
    case CHECKOUT_SUCCESS:
      action.result.cookieNames.map((name) => {
        setCookie(name, parseInt(getCookie(name), 10) - 1);
      });
      return {
        ...state,
        loading: false,
        loaded: true,
        cart: [],
      };
    case CHECKOUT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function getCart(id) {
  return {
    types: [GET_CART, GET_CART_SUCCESS, GET_CART_FAIL],
    promise: (client) => client.post('/getCart', {
      data: {
        id,
      }
    })
  };
}

export function removeItem(userId, gameId) {
  return {
    types: [REMOVE_ITEM_FROM_CART, REMOVE_ITEM_FROM_CART_SUCCESS, REMOVE_ITEM_FROM_CART_FAIL],
    promise: (client) => client.post('/removeItemFromCart', {
      data: {
        userId,
        gameId,
      }
    })
  };
}

export function checkout(userId) {
  return {
    types: [CHECKOUT, CHECKOUT_SUCCESS, CHECKOUT_FAIL],
    promise: (client) => client.post('/checkout', {
      data: {
        userId,
      }
    })
  };
}
