import { connect } from 'react-redux';
import {
  openModal,
  closeModal
} from '../../actions/modal_actions'
import SessionForm from './session_form';
import {
  login
} from '../../actions/session_actions'

const mSTP = state => ({
  formType: 'Log in', 
  errors: state.errors.session
})

const mDTP = dispatch => ({
  formAction: (user) => dispatch(login(user)),
  demoAction: (demoUser) => dispatch(login(demoUser)),
  closeModal: () => dispatch(closeModal()),
  openModal: () => dispatch(openModal('signup'))
})

export default connect(mSTP, mDTP)(SessionForm)