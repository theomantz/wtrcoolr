import { connect } from 'react-redux';
import { closeSessionModal } from '../../actions/session_actions';
import SessionModal from './session_modal';

const mSTP = state => ({
  modal: state.ui.modal
})

const mDTP = dispatch => ({
  closeSessionModal: () => dispatch(closeSessionModal())

});

export default connect(mSTP, mDTP)(SessionModal)