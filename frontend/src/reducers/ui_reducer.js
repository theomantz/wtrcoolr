import ModalReducer from './modal_reducer';
import coolrReducer from './coolrs_reducer';
import { combineReducers } from 'redux';
import pausedReducer from './paused_reducer';
import notifiedOfCoolrs from './notified_of_coolrs_reducer';
import SocketReducer from './socket_reducer';
import pairInterests from './pair_interests_reducer';
import waiting from './waiting_reducer';

export default combineReducers({
  modal: ModalReducer,
  currentCoolrs: coolrReducer,
  notifiedOfCoolrs: notifiedOfCoolrs,
  paused: pausedReducer,
  socket: SocketReducer,
  pairInterests,
  waiting
})