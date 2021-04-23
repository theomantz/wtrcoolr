import { connect } from 'react-redux';
import { queryMatch } from '../../actions/match_actions';
import React from 'react';
import { closeModal } from '../../actions/modal_actions';

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
    this.props.closeModal();
  }

  render () {
    
    return (
      <div>
        <div>
          <p>
            {this.props.currentCoolrs[0][1].name} has coolr hours now.
          </p>
        </div>
        <button onClick={this.props.handleClick}>
          Join the fun?
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
  closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(PairPrompt)

