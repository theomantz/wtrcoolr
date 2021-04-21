import { connect } from 'react-redux';
import { selectAdminOrg } from '../../reducers/selectors';
import Admin from './admin';
import { 
    openModal
  } from '../../actions/modal_actions'

const mapStateToProps = (state, { match }) => {
//   const orgId = parseInt(match.params.orgId);
//   const org = selectAdminOrg(state.session.user.orgs, orgId);
//   return {
//     orgId,
//     org,
//   };
};

const mapDispatchToProps = dispatch => ({
    openModal: modal => dispatch(openModal(modal)),
  //fetchMovie: id => dispatch(fetchMovie(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
