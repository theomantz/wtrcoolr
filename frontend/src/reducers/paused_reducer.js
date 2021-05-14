import {
  UNPAUSE_COUNTER,
  PAUSE_COUNTER
} from '../actions/match_actions';
import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/modal_actions';


const pausedReducer = (state = false, action) => {
  switch (action.type) {
    case UNPAUSE_COUNTER:
      return false;
    case CLOSE_MODAL:
      return false;
    case PAUSE_COUNTER:
      return true;
    case OPEN_MODAL:
      return true;
    default:
      return state;
  }
};

export default pausedReducer;