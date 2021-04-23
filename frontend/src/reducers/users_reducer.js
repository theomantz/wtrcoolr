import { 
  RECEIVE_USERS
} from '../actions/users_actions';
import {
  RECEIVE_MATCH,
  RECEIVE_ROUTED,
  SET_MATCH_ATTEMPTED
} from '../actions/match_actions';

const initState = {
  // matchAttempted: false,
  routed: false,
  matchData: {}
}

const UsersReducer = ( state = initState, action ) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_USERS:
      return action.users;
    case RECEIVE_MATCH:
      return {match: action.matchEmail, routed: false}
    case RECEIVE_ROUTED:
      return Object.assign({}, state, {routed: true})
    // case SET_MATCH_ATTEMPTED:
    //   return Object.assign({}, state, {matchAttempted: true})
    default:
      return state;
  }
}

export default UsersReducer