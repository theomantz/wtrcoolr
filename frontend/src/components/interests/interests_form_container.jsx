import { connect } from 'react-redux'
import InterestsForm from './interests_form'
import { closeModal } from '../../actions/modal_actions'
import {updateUser} from '../../actions/users_actions'

const mSTP = state => ({
  errors: state.errors.session,
  currentUserId: state.session.user.id
})

const mDTP = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  updateUser: (user) => dispatch(updateUser(user))
})

export default connect(mSTP, mDTP)(InterestsForm)