import { connect } from 'react-redux';
import {
  openModal,
  closeModal
} from '../../actions/modal_actions'
import SessionForm from './session_form';
import {
  login,
  logout,
} from '../../actions/session_actions'

const mSTP = state => ({
  formType: 'Log in', 
  sessionErrors: state.errors.sessionErrors
})

const mDTP = dispatch => ({
  formAction: (user) => dispatch(login(user)),
  closeSessionModal: () => dispatch(closeModal()),
  switchSessionModal: () => dispatch(openModal('signup'))
})

export default connect(mSTP, mDTP)(SessionForm)