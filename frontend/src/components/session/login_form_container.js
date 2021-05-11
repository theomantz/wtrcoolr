import { connect } from 'react-redux';
import {
  openModal,
  closeModal
} from '../../actions/modal_actions'
import SessionForm from './session_form';
import {
  login,
  demoLogin,
  clearErrors
} from '../../actions/session_actions'

const mSTP = state => ({
  formType: 'Log in', 
  errors: state.errors.session
})

const mDTP = dispatch => ({
  formAction: (user) => dispatch(login(user)),
  demoLogin: () => dispatch(demoLogin()),
  closeModal: () => dispatch(closeModal()),
  openModal: (modal) => dispatch(openModal(modal)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mSTP, mDTP)(SessionForm)