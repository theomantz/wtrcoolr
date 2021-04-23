import { connect } from 'react-redux'
import InterestForm from './interest_form'
import { closeModal } from '../../actions/modal_actions'
import {updateUser} from '../../actions/users_actions'

const mSTP = state => ({
  errors: state.errors.session
})

const mDTP = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  updateUser: (user) => dispatch(updateUser(user))
})

export default connect(mSTP, mDTP)(InterestForm)