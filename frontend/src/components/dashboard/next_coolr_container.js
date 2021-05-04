import { connect } from 'react-redux';
import NextCoolr from './next_coolr';
import * as TCUtil from '../../util/time_conversion_util'



const mSTP = state => {
  
  return ({
    orgs: state.session.user.orgs,
    TCUtil: TCUtil
  })
}

export default connect( mSTP, null)(NextCoolr);