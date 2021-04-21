import { connect } from 'react-redux';
import { selectAdminOrg } from '../../reducers/selectors';
import Admin from './admin';

const mapStateToProps = (state, { match }) => {
  const orgId = parseInt(match.params.orgId);
  const org = selectAdminOrg(state.session.user.orgs, orgId);
  return {
    orgId,
    org,
  };
};

const mapDispatchToProps = dispatch => ({
  //fetchMovie: id => dispatch(fetchMovie(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
