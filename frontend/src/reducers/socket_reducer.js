import {
  RECEIVE_SOCKET,
  REMOVE_SOCKET
} from '../actions/users_actions'

const SocketReducer = ( state = false, action ) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_SOCKET:
      return action.currentUser.data.socket;
    case REMOVE_SOCKET:
      return null;
    default:
      return state;
  }
}

export default SocketReducer;