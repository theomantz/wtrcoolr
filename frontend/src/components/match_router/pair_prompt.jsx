import { connect } from 'react-redux';
import { 
  queryMatch,
  addToNotified,
  removeCurrentCoolrs,
  pauseCounter
} from '../../actions/match_actions';
import React from 'react';
import { 
  closeModal
 } from '../../actions/modal_actions';
import './pair_prompt.scss'

class PairPrompt extends React.Component {

  constructor(props) {
    super(props)

    this.handleClickNotify = this.handleClickNotify.bind(this)
    this.handleClickCoolrLink = this.handleClickCoolrLink.bind(this)
  }

  componentDidMount() {
    this.props.pause();
  }

  handleClickNotify() {
    
    this.props.queryMatch({
      userId: this.props.userId,
      orgId: this.props.currentCoolrs[0][1]._id
    })
    this.props.addToNotified(this.props.currentCoolrs);
    this.props.removeCurrentCoolrs(this.props.currentCoolrs);
    this.props.closeModal();
  }

  handleClickCoolrLink() {
    
    this.props.queryMatch({
      userId: this.props.userId,
      orgId: this.props.notifiedOfCoolrs[0][1]._id
    })
    this.props.closeModal();
  }

  render () {
    
  if(this.props.currentCoolrs.length > 0 
    || 
    this.props.notifiedOfCoolrs.length > 0) {
      let source;
      let click;
      if(this.props.currentCoolrs.length > 0) {
        source = this.props.currentCoolrs;
        click = this.handleClickNotify;
      } else {
        source = this.props.notifiedOfCoolrs;
        click = this.handleClickCoolrLink;
      }
        
      return (
        <div className="pair-promp-container">
          <div>
            <p className="org-name-pair-prompt">
              {source[0][1].name}
            </p>
            <p>
              has coolr hours now.
            </p>
          </div>
          <button 
            onClick={click}>
            Chat with a member
          </button>
        </div>
      )
    } else {
      return (
        <div className="pair-promp-container">
          <div>
            <p className="org-name-pair-prompt">
              You have no current Coolr hours.
            </p>
            <p>
              Come back during coolr hours or try joining a new org to chat.
            </p>
          </div>
        </div>
      )
    }
  }

}

const mSTP = state => ({
  currentCoolrs: state.ui.currentCoolrs,
  notifiedOfCoolrs: state.ui.notifiedOfCoolrs,
  userId: state.session.user.id
})

const mDTP = dispatch => ({
  queryMatch: (matchData) => dispatch(queryMatch(matchData)),
  closeModal: () => dispatch(closeModal()),
  addToNotified: (coolrHours) => dispatch(addToNotified(coolrHours)),
  removeCurrentCoolrs: currentCoolrs => dispatch(removeCurrentCoolrs(currentCoolrs)),
  pause: () => dispatch(pauseCounter())

})

export default connect(mSTP, mDTP)(PairPrompt)

