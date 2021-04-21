import { connect } from 'react-redux';
import { 
  closeModal 
} from '../../actions/modal_actions'
import AddMember from './add_member';

const mSTP = state => ({
  formType: "Add Member",
  errors: state.errors.session,
  currentUser: state.session.user.id
});

const mDTP = dispatch => ({
  //formAction: (org) => dispatch(createOrg(org)),
  closeModal: () => dispatch(closeModal()),
  //openModal: () => dispatch(openModal('login'))
});

export default connect(mSTP, mDTP)(AddMember)