const { CLOSE_MODAL, OPEN_MODAL } = require("../actions/modal_actions")


const ModalReducer = ( state = false, action) => {
  Object.freeze(state)
  switch(action.type) {
    case CLOSE_MODAL:
      return false
    case OPEN_MODAL:
      return true
    default:
      return state;
  }
}

export default ModalReducer;