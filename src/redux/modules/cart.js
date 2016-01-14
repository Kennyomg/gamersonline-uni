const GET_CART = 'redux-example/home/GET_CART';
const GET_CART_SUCCESS = 'redux-example/home/GET_CART_SUCCESS';
const GET_CART_FAIL = 'redux-example/home/GET_CART_FAIL';

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
