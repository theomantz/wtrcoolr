import { 
  RECEIVE_USERS
} from '../actions/users_actions';
import {
  RECEIVE_MATCH,
  RECEIVE_ROUTED
} from '../actions/match_actions';

const UsersReducer = ( state = {}, action ) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_USERS:
      return action.users;
    case RECEIVE_MATCH:
      return {match: action.matchEmail, routed: false}
    case RECEIVE_ROUTED:
      return Object.assign({}, state, {routed: true})
    default:
      return state;
  }
}

export default UsersReducer