import { connect } from 'react-redux';
import { 
  openModal, 
  closeModal 
} from '../../actions/modal_actions'
import { createOrg } from '../../actions/org_actions'
import CreateOrgForm from './create_org_form';
import {updateUser} from '../../actions/users_actions'
import {updateOrgUsers,getPublicOrgs} from '../../actions/org_actions'

const mSTP = state => ({
  formType: "Create Organization",
  errors: state.errors.session,
  currentUser: state.session.user
});

const mDTP = dispatch => ({
  formAction: (org) => dispatch(createOrg(org)),
  closeModal: () => dispatch(closeModal()),
  updateUser: (user) => dispatch(updateUser(user)),
  updateOrgUsers: (org) => dispatch(updateOrgUsers(org)),
  getPublicOrgs: () => dispatch(getPublicOrgs()),
});

export default connect(mSTP, mDTP)(CreateOrgForm)