import {
  RECEIVE_SOCKET
} from '../actions/users_actions'

const SocketReducer = ( state = false, action ) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_SOCKET:
      return action.currentUser.data.socket;
    default:
      return state;
  }
}

export default SocketReducer;