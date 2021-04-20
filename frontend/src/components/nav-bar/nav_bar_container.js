import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal,
  closeModal } from '../../actions/modal_actions';
import NavBar from './nav_bar';


const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
  logout: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);