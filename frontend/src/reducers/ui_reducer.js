import ModalReducer from './modal_reducer'
import { combineReducers } from 'react-redux'

export default combineReducers({
  modal: ModalReducer
})