import { connect } from 'react-redux'
import CoolrVideo from './coolr_video';
import { 
  dispatchMessage
} from '../../actions/chat_actions';
import {
  assignSocket,
  nullSocket,
  fetchSocket
} from '../../actions/users_actions';
import { unpauseCounter  } from '../../actions/match_actions'
import { withRouter } from 'react-router-dom';


const mapStateToProps = ({ session, messages, entities }) => {
  debugger
  return {
    user: session.user,
    messages: messages,
    userMatch:
      entities.users.match === "available" ? null : entities.users.match,
    initiator: Boolean(entities.users.match !== "available"),
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchMessage: message => dispatch(dispatchMessage(message)),
  assignSocket: userData => dispatch(assignSocket(userData)),
  removeSocket: user => dispatch(nullSocket(user)),
  fetchSocket: email => dispatch(fetchSocket(email)),
  unpause: () => dispatch(unpauseCounter ())
});

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(CoolrVideo))