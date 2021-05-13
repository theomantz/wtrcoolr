import {
  START_WAITING,
  STOP_WAITING
} from '../actions/match_actions';

export default (state = false, action) => {
  Object.freeze(state)
  switch (action.type) {
    case START_WAITING:
      return true
    case STOP_WAITING:
      return false
    default:
      return state;
  }
};