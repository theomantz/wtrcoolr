import { connect } from 'react-redux'
import Splash from './splash'
import { openModal } from '../../actions/modal_actions'


const mDTP = (dispatch) =>({
  openModal: (modalType) => dispatch(openModal(modalType))
})

export default connect(null, mDTP)(Splash)