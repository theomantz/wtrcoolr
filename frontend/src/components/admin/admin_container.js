import { connect } from 'react-redux';
import { selectAdminOrg } from '../../reducers/selectors';
import Admin from './admin';
import { 
    openModal
  } from '../../actions/modal_actions'

const mapStateToProps = (state, { match }) => {
  const orgId = match.params.orgId || ''
  const org = selectAdminOrg(state.session.user.orgs, orgId) || {};
  const user = state.session.user
  
  return {
    orgId,
    org,
    user
  };
};

const mapDispatchToProps = dispatch => ({
    openModal: modal => dispatch(openModal(modal)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
