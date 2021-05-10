import { connect } from 'react-redux';
import { 
  queryMatch,
  addToNotified,
  removeCurrentCoolrs,
} from '../../actions/match_actions';
import React from 'react';
import { 
  closeModal
 } from '../../actions/modal_actions';
import './pair_prompt.scss'

class PairPrompt extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.queryMatch({
      userId: this.props.userId,
      orgId: this.props.currentCoolrs[0][1]._id
    })
    this.props.addToNotified(this.props.currentCoolrs);
    this.props.removeCurrentCoolrs(this.props.currentCoolrs);
    this.props.closeModal();
  }

  render () {
    
    return (
      <div className="pair-promp-container">
        <div>
          <p className="org-name-pair-prompt">
            {this.props.currentCoolrs[0][1].name}
          </p>
          <p>
            has coolr hours now.
          </p>
        </div>
        <button 
          onClick={this.handleClick}>
          Chat with a member
        </button>
      </div>
    )
  }

}

const mSTP = state => ({
  currentCoolrs: state.ui.currentCoolrs,
  userId: state.session.user.id
})

const mDTP = dispatch => ({
  queryMatch: (matchData) => dispatch(queryMatch(matchData)),
  closeModal: () => dispatch(closeModal()),
  addToNotified: (coolrHours) => dispatch(addToNotified(coolrHours)),
  removeCurrentCoolrs: currentCoolrs => dispatch(removeCurrentCoolrs(currentCoolrs)),


})

export default connect(mSTP, mDTP)(PairPrompt)

