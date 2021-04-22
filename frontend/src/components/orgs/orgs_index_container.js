import { connect } from 'react-redux';
import OrgsIndex from './orgs_index';
import {updateUser} from '../../actions/users_actions'
import {updateOrgUsers,getPublicOrgs} from '../../actions/org_actions'


const mapStateToProps = state => {

  return {
    orgs: state.entities.publicOrgs,
    currentUser: state.session.user
  }
};

const mapDispatchToProps = dispatch => ({
    updateUser: (user) => dispatch(updateUser(user)),
    updateOrgUsers: (org) => dispatch(updateOrgUsers(org)),
    getPublicOrgs: () => dispatch(getPublicOrgs()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgsIndex);