import {
  UNPAUSE_COUNTER,
  PAUSE_COUNTER
} from '../actions/match_actions';


const pausedReducer = (state = false) => {
  switch (action.type) {
    case UNPAUSE_COUNTER:
      return false;
    case PAUSE_COUNTER:
      return true;
    default:
      return state;
  }
};

export default pausedReducer;