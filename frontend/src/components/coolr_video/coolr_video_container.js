import { connect } from 'react-redux'
import CoolrVideo from './coolr_video';

import { 
  dispatchMessage
} from '../../actions/chat_actions';

import { withRouter } from 'react-router-dom';


const mapStateToProps = ({ session, messages }) => ({
  user: session.user,
  messages: messages
});

const mapDispatchToProps = dispatch => ({
  dispatchMessage: message => dispatch(dispatchMessage(message))
});

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(CoolrVideo))