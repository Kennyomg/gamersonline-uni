const CREATE_GAME = 'redux-example/admin/CREATE_GAME';
const CREATE_GAME_SUCCESS = 'redux-example/admin/CREATE_GAME_SUCCESS';
const CREATE_GAME_FAIL = 'redux-example/admin/CREATE_GAME_FAIL';
const UPDATE_GAME = 'redux-example/admin/UPDATE_GAME';
const UPDATE_GAME_SUCCESS = 'redux-example/admin/UPDATE_GAME_SUCCESS';
const UPDATE_GAME_FAIL = 'redux-example/admin/UPDATE_GAME_FAIL';
const DELETE_GAME = 'redux-example/admin/DELETE_GAME';
const DELETE_GAME_SUCCESS = 'redux-example/admin/DELETE_GAME_SUCCESS';
const DELETE_GAME_FAIL = 'redux-example/admin/DELETE_GAME_FAIL';

const initialState = {
  game: {},
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_GAME:
      return {
        ...state,
        creating: true
      };
    case CREATE_GAME_SUCCESS:
      return {
        ...state,
        creating: false,
        game: action.result
      };
    case CREATE_GAME_FAIL:
      return {
        ...state,
        creating: false,
        user: null,
        createError: action.error
      };
    case UPDATE_GAME:
      return {
        ...state,
        updating: true
      };
    case UPDATE_GAME_SUCCESS:
      return {
        ...state,
        updating: false,
        game: action.result
      };
    case UPDATE_GAME_FAIL:
      return {
        ...state,
        updating: false,
        updateError: action.error
      };
    case DELETE_GAME:
      return {
        ...state,
        deleting: true
      };
    case DELETE_GAME_SUCCESS:
      return {
        ...state,
        deleting: false,
        game: null
      };
    case DELETE_GAME_FAIL:
      return {
        ...state,
        deleting: false,
        deleteError: action.error
      };
    default:
      return state;
  }
}

export function createGame(name, description, price, releasedate) {
  return {
    types: [CREATE_GAME, CREATE_GAME_SUCCESS, CREATE_GAME_FAIL],
    promise: (client) => client.post('/createGame', {
      data: {
        name: name,
        description: description,
        price: price,
        releasedate: releasedate,
      }
    })
  };
}

export function updateGame(name, description, price, releasedate) {
  return {
    types: [UPDATE_GAME, UPDATE_GAME_SUCCESS, UPDATE_GAME_FAIL],
    promise: (client) => client.get('/updateGame', {
      data: {
        name: name,
        description: description,
        price: price,
        releasedate: releasedate,
      }
    })
  };
}

export function deleteGame(id) {
  return {
    types: [DELETE_GAME, DELETE_GAME_SUCCESS, DELETE_GAME_FAIL],
    promise: (client) => client.get('/deleteGame', {
      data: {
        id: id,
      }
    })
  };
}
