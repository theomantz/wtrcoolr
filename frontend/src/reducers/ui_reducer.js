import ModalReducer from './modal_reducer';
import coolrReducer from './coolrs_reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  modal: ModalReducer,
  currentCoolrs: coolrReducer
})