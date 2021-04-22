import { connect } from 'react-redux';
import Dashboard from './dashboard';
import {getPublicOrgs} from '../../actions/org_actions';


const mapStateToProps = state => {
    //let mostPopular = state.entities.publicOrgs
    return {
      state: state,
    }
};

const mapDispatchToProps = dispatch => ({
  getPublicOrgs: () => dispatch(getPublicOrgs())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);