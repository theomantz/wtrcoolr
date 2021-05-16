import {connect} from 'react-redux'
import MatchInfo from './match_info'

const mSTP = state =>({

  matchInfo: state.ui.pairInterests

})

export default connect(mSTP)(MatchInfo)