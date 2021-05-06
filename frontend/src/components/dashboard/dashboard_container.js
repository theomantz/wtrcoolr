import { connect } from 'react-redux';
import Dashboard from './dashboard';
import {getPublicOrgs} from '../../actions/org_actions';
import {fetchUser} from '../../actions/users_actions';


const mapStateToProps = state => {
    return {
      state: state,
    }
};

const mapDispatchToProps = dispatch => ({
  getPublicOrgs: () => dispatch(getPublicOrgs()),
  fetchUser: () => dispatch(fetchUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);