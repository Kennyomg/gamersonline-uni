import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';

import admin from './admin';
import auth from './auth';
import counter from './counter';
import home from './home';
import {reducer as form} from 'redux-form';
import info from './info';
import cart from './cart';
import widgets from './widgets';

export default combineReducers({
  router: routerStateReducer,
  admin,
  auth,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  home,
  form,
  info,
  cart,
  widgets
});
