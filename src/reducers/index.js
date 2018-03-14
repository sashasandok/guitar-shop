import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import guitars from './guitars';
import guitarsPage from './guitarsPage';
import guitarPage from './guitarPage';
import basket from './basket';
import categories from './categories';

export default combineReducers({
  routing: routerReducer,
  guitars,
  guitarsPage,
  guitarPage,
  basket,
  categories
})