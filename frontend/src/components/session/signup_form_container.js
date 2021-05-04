import { connect } from 'react-redux';
import { 
  openModal, 
  closeModal 
} from '../../actions/modal_actions'
import { 
  signup,
  login
} from '../../actions/session_actions'
import SessionForm from './session_form';

const mSTP = state => ({
  formType: "Sign up",
  errors: state.errors.session
});

const mDTP = dispatch => ({
  formAction: (user) => dispatch(signup(user)),
  demoAction: (demoUser) => dispatch(login(demoUser)),
  closeModal: () => dispatch(closeModal()),
  openModal: (modal) => dispatch(openModal(modal)),
});

export default connect(mSTP, mDTP)(SessionForm)