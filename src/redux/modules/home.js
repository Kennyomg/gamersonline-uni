const UNLOAD_GAME = 'redux-example/home/GET_GAME_LIST';
const ADD_ITEM_TO_CART = 'redux-example/home/ADD_ITEM_TO_CART';
const ADD_ITEM_TO_CART_SUCCESS = 'redux-example/home/ADD_ITEM_TO_CART_SUCCESS';
const ADD_ITEM_TO_CART_FAIL = 'redux-example/home/ADD_ITEM_TO_CART_FAIL';
const GET_GAME = 'redux-example/home/GET_GAME';
const GET_GAME_SUCCESS = 'redux-example/home/GET_GAME_SUCCESS';
const GET_GAME_FAIL = 'redux-example/home/GET_GAME_FAIL';
const GET_GAME_LIST = 'redux-example/home/GET_GAME_LIST';
const GET_GAME_LIST_SUCCESS = 'redux-example/home/GET_GAME_LIST_SUCCESS';
const GET_GAME_LIST_FAIL = 'redux-example/home/GET_GAME_LIST_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UNLOAD_GAME:
      return {
        ...state,
        loaded: false,
        game: null
      };
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        loading: true
      };
    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        cart: action.result,
      };
    case ADD_ITEM_TO_CART_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case GET_GAME:
      return {
        ...state,
        loading: true
      };
    case GET_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        game: action.result
      };
    case GET_GAME_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case GET_GAME_LIST:
      return {
        ...state,
        loading: true
      };
    case GET_GAME_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        games: action.result
      };
    case GET_GAME_LIST_FAIL:
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

export function isLoaded(globalState) {
  return globalState.home && globalState.home.loaded;
}

export function unloadGame() {
  return {
    types: [UNLOAD_GAME],
    promise: (client) => client.get('/')
  };
}

export function addItemToCart(user, id) {
  return {
    types: [ADD_ITEM_TO_CART, ADD_ITEM_TO_CART_SUCCESS, ADD_ITEM_TO_CART_FAIL],
    promise: (client) => client.post('/addItemToCart', {
      data: {
        user_id: user,
        id: id,
      }
    })
  };
}

export function getGame(id) {
  return {
    types: [GET_GAME, GET_GAME_SUCCESS, GET_GAME_FAIL],
    promise: (client) => client.post('/getGame', {
      data: {
        gameId: id,
      }
    })
  };
}

export function getGameList() {
  return {
    types: [GET_GAME_LIST, GET_GAME_LIST_SUCCESS, GET_GAME_LIST_FAIL],
    promise: (client) => client.get('/getGameList')
  };
}
