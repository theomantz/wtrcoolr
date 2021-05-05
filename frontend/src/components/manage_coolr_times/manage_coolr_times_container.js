import { connect } from 'react-redux';
// import { selectAdminOrg } from '../../reducers/selectors';
import ManageCoolrTimes from './manage_coolr_times';
import {updateUser} from '../../actions/users_actions'
import {getPublicOrgs} from '../../actions/org_actions'

const mapStateToProps = (state, { match }) => {
  const currentUser = state.session.user
  return {
    currentUser
  };
};

const mapDispatchToProps = dispatch => ({
    updateUser: (user) => dispatch(updateUser(user)),
    getPublicOrgs: () => dispatch(getPublicOrgs()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoolrTimes);
