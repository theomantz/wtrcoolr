import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/modal_actions'


const ModalReducer = ( state = false, action) => {
  Object.freeze(state)
  switch(action.type) {
    case OPEN_MODAL:
      return action.modal
    case CLOSE_MODAL:
      return false
    default:
      return state;
  }
}

export default ModalReducer;