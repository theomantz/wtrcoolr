import {
  RECEIVE_USERS,
  RECEIVE_USER_MATCH_SOCKET,
} from "../actions/users_actions";
import {
  RECEIVE_MATCH,
  RECEIVE_ROUTED
} from '../actions/match_actions';

const initState = {
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
    case RECEIVE_USER_MATCH_SOCKET:
      return action.user.data;
    default:
      return state;
  }
}

export default UsersReducer