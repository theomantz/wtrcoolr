import ModalReducer from './modal_reducer'
import SocketReducer from './socket_reducer'
import { combineReducers } from 'redux'

export default combineReducers({
  modal: ModalReducer,
  socket: SocketReducer
})