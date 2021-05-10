import { connect } from 'react-redux';
import OrganizationList from './organization_list';
import { updateOrgUsers } from '../../actions/org_actions';
import { updateUser } from '../../actions/users_actions';



const mSTP = state => ({
  currentUser: state.session.user,
  itemArr: state.session.user.orgs.map(org => (
    { id: String(org._id), content: org.name, admins: org.admins }
  ))
})

const mDTP = dispatch => ({
  updateOrgUsers: org => dispatch(updateOrgUsers(org)),
  updateUser: user => dispatch(updateUser(user))
})

export default connect(mSTP, mDTP)(OrganizationList);