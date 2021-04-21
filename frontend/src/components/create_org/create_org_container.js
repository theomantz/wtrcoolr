import { connect } from 'react-redux';
import { 
  openModal, 
  closeModal 
} from '../../actions/modal_actions'
import { createOrg } from '../../actions/org_actions'
import CreateOrgForm from './create_org_form';

const mSTP = state => ({
  formType: "Create Organization",
  errors: state.errors.session
});

const mDTP = dispatch => ({
  formAction: (org) => dispatch(createOrg(org)),
  closeModal: () => dispatch(closeModal()),
  //openModal: () => dispatch(openModal('login'))
});

export default connect(mSTP, mDTP)(CreateOrgForm)