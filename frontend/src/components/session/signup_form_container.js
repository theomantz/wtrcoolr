import { connect } from 'react-redux';
import { 
  openModal, 
  closeModal 
} from '../../actions/modal_actions'
import { 
  signup,
  clearErrors,
  demoLogin
 } from '../../actions/session_actions'
import SessionForm from './session_form';

const mSTP = state => ({
  formType: "Sign up",
  errors: state.errors.session
});

const mDTP = dispatch => ({
  formAction: (user) => dispatch(signup(user)),
  demoLogin: () => dispatch(demoLogin()),
  closeModal: () => dispatch(closeModal()),
  openModal: (modal) => dispatch(openModal(modal)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mSTP, mDTP)(SessionForm)