import {
  FETCH_GUITARS_SUCCESS,
  LOAD_MORE_GUITARS_SUCCESS,
  FETCH_GUITAR_BY_ID_SUCCESS
} from '../actionTypes';
import R from 'ramda';

const initialState = {};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_GUITARS_SUCCESS:
      const newValues = R.indexBy(R.prop('id'), payload)
      return R.merge(state, newValues);
    case LOAD_MORE_GUITARS_SUCCESS:
      const moreValues = R.indexBy(R.prop('id'), payload)
      return R.merge(state, moreValues);  
    case FETCH_GUITAR_BY_ID_SUCCESS:
      return R.assoc(payload.id, payload, state);  
    default:
      return state;
  }
}