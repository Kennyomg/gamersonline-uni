const CREATE_GAME = 'redux-example/admin/CREATE_GAME';
const CREATE_GAME_SUCCESS = 'redux-example/admin/CREATE_GAME_SUCCESS';
const CREATE_GAME_FAIL = 'redux-example/admin/CREATE_GAME_FAIL';
const UPDATE_GAME = 'redux-example/admin/UPDATE_GAME';
const UPDATE_GAME_SUCCESS = 'redux-example/admin/UPDATE_GAME_SUCCESS';
const UPDATE_GAME_FAIL = 'redux-example/admin/UPDATE_GAME_FAIL';
const DELETE_GAME = 'redux-example/admin/DELETE_GAME';
const DELETE_GAME_SUCCESS = 'redux-example/admin/DELETE_GAME_SUCCESS';
const DELETE_GAME_FAIL = 'redux-example/admin/DELETE_GAME_FAIL';
const OPEN_SPECIAL_CHECKBOX = 'redux-example/admin/OPEN_SPECIAL_CHECKBOX';
const ADD_SPECIAL_EDITION = 'redux-example/admin/ADD_SPECIAL_EDITION';
const ADD_SPECIAL_EDITION_SUCCESS = 'redux-example/admin/ADD_SPECIAL_EDITION_SUCCESS';
const ADD_SPECIAL_EDITION_FAIL = 'redux-example/admin/ADD_SPECIAL_EDITION_FAIL';

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
    case ADD_SPECIAL_EDITION:
      return {
        ...state,
        creating: true
      };
    case ADD_SPECIAL_EDITION_SUCCESS:
      return {
        ...state,
        creating: false,
        game: action.result
      };
    case ADD_SPECIAL_EDITION_FAIL:
      return {
        ...state,
        creating: false,
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
    case OPEN_SPECIAL_CHECKBOX:
      return {
        ...state,
        openedCheckboxes: [
          ...state.openedCheckboxes,
          action.gameid
        ]
      };
    default:
      return state;
  }
}

export function createGame(name, description, price, releasedate, imgData) {
  return {
    types: [CREATE_GAME, CREATE_GAME_SUCCESS, CREATE_GAME_FAIL],
    promise: (client) => client.post('/createGame', {
      data: {
        name,
        description,
        price,
        releasedate,
        imgData,
      }
    })
  };
}

export function addSpecialEdition(gameId, amount, price, imgData) {
  return {
    types: [ADD_SPECIAL_EDITION, ADD_SPECIAL_EDITION_SUCCESS, ADD_SPECIAL_EDITION_FAIL],
    promise: (client) => client.post('/addSpecialEdition', {
      data: {
        gameId,
        amount,
        price,
        imgData,
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

export function openSpecialCheckbox(id) {
  return {
    type: OPEN_SPECIAL_CHECKBOX,
    gameid: id,
  };
}
