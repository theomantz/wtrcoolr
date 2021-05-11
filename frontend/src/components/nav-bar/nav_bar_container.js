import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal,
  closeModal } from '../../actions/modal_actions';
import NavBar from './nav_bar';

const mapStateToProps = ({ session }) => ({
  loggedIn: session.isAuthenticated,
  user: session.user
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
  logout: (user) => dispatch(logout(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);