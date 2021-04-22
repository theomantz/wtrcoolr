import { 
  RECEIVE_USERS,
  RECEIVE_USER_MATCH_SOCKET
} from '../actions/users_actions'

const UsersReducer = ( state = {}, action ) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_USERS:
      return action.users;
    case RECEIVE_USER_MATCH_SOCKET:
      return action.user.data;
    default:
      return state;
  }
}

export default UsersReducer