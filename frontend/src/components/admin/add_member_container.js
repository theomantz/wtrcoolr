import { connect } from 'react-redux';
import { 
  closeModal 
} from '../../actions/modal_actions'
import AddMember from './add_member';
import {updateUser} from '../../actions/users_actions'
import {updateOrgUsers,getPublicOrgs} from '../../actions/org_actions'
import { selectAdminOrg } from '../../reducers/selectors';
import {useParams} from "react-router-dom";

const mSTP = (state) => {
  const orgId = window.adminOrgId
  const org = selectAdminOrg(state.session.user.orgs, orgId) || {};
  return ({
  formType: "Add Member",
  errors: state.errors.session,
  currentUser: state.session.user.id,
  orgId,
  org
})}

const mDTP = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  updateUser: (user) => dispatch(updateUser(user)),
  updateOrgUsers: (org) => dispatch(updateOrgUsers(org)),
  getPublicOrgs: () => dispatch(getPublicOrgs()),
});

export default connect(mSTP, mDTP)(AddMember)