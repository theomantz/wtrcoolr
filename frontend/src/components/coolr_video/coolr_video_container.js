import { connect } from 'react-redux'
import CoolrVideo from './coolr_video';
import { 
  dispatchMessage
} from '../../actions/chat_actions';
import {
  assignSocket,
  nullSocket,
  fetchSocket
} from '../../actions/users_actions'

import { withRouter } from 'react-router-dom';


const mapStateToProps = ({ session, messages, entities }) => ({
  user: session.user,
  messages: messages,
  userMatch: entities.users,
  initiator: session.user.email === 'demo@example.com' ? true : false
});

const mapDispatchToProps = dispatch => ({
  dispatchMessage: message => dispatch(dispatchMessage(message)),
  assignSocket: userData => dispatch(assignSocket(userData)),
  removeSocket: user => dispatch(nullSocket(user)),
  fetchSocket: email => dispatch(fetchSocket(email))
});

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(CoolrVideo))