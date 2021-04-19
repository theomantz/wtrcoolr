import { connect } from 'react-redux';
import {
  openSessionModal,
  closeSessionModal
} from '../../actions/session/session_actions'
import SessionForm from './session_form';

const mSTP = state => ({
  formType: 'Log in', 
  sessionErrors: state.errors.sessionErrors
})

const mDTP = dispatch => ({
  formAction: (user) => dispatch(login(user)),
  closeSessionModal: () => dispatch(closeSessionModal()),
  switchSessionModal: () => dispatch(openSessionModal('signup'))
})

export default connect(mSTP, mDTP)(SessionForm)