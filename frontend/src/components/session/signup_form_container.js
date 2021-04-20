import { connect } from 'react-redux';
import { 
  openModal, 
  closeModal 
} from '../../actions/modal_actions'
import { signup } from '../../actions/session_actions'
import SessionForm from './session_form';

const mSTP = state => ({
  formType: "Sign up",
  errors: state.errors.sessionErrors
});

const mDTP = dispatch => ({
  formAction: (user) => dispatch(signup(user)),
  closeModal: () => dispatch(closeModal()),
  switchSessionModal: () => dispatch(openModal('login'))
});

export default connect(mSTP, mDTP)(SessionForm)