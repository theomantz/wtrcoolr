import { connect } from 'react-redux';
import { queryMatch } from '../../actions/match_actions';
import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import './pair_prompt.scss'

class PairPrompt extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.queryMatch({
      userId: this.props.userId,
      orgId: this.props.currentCoolrs[0][1].id
    });
    console.log(this.props.queryMatch)
    // this.props.closeModal();
    // isAxiosError
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
          Chance Encounter
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
  queryMatch: (userId, orgId) => dispatch(queryMatch(userId, orgId)),
  // closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(PairPrompt)

