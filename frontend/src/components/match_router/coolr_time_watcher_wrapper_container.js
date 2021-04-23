import { connect } from 'react-redux'
import CoolrTimeWatcherWrapper from './coolr_time_watcher_wrapper'


const mSTP = state => ({
  loggedIn: state.session.isAuthenticated
})

// const mDTP = dispatch => ({
//   queryMatch: userData => dispatch(queryMatch(userData)),
//   addCurrentCoolrs: currentCoolrs => dispatch(addCurrentCoolrs(currentCoolrs)),
//   removeCurrentCoolrs: currentCoolrs => dispatch(removeCurrentCoolrs(currentCoolrs))
// })

export default connect(mSTP, null)(CoolrTimeWatcherWrapper); 