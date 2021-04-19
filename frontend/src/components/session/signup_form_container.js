import { connect } from 'react-redux';
import { 
  openSessionModal, 
  closeSessionModal 
} from '../../actions/session/session_actions'
import SessionForm from './session_form';

const mSTP = state => ({
  formType: "Sign up",
  errors: state.errors.sessionErrors
});

const mDTP = dispatch => ({
  formAction: (user) => dispatch(signup(user)),
  closeSessionModal: () => dispatch(closeSessionModal()),
  switchSessionModal: () => dispatch(openSessionModal('login'))
});

export default connect(mSTP, mDTP)(SessionForm)