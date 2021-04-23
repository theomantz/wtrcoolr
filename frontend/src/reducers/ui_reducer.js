import ModalReducer from './modal_reducer';
import coolrReducer from './coolrs_reducer';
import { combineReducers } from 'redux';
import pausedReducer from './paused_reducer';

export default combineReducers({
  modal: ModalReducer,
  currentCoolrs: coolrReducer,
  paused: pausedReducer
})