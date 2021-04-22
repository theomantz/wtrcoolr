import { connect } from 'react-redux';
import NextCoolr from './next_coolr';
import * as TCUtil from '../../util/time_coversion_util'



const mSTP = state => {
  
  return ({
    orgs: state.session.user.orgs,
    TCUtil: TCUtil
  })
}

// entities.users.orgs.map(orgId => {
// entities.orgs[orgId]  }) --> array
// indices 1-4 in the time matches 24 hour digital clock digits

export default connect( mSTP, null)(NextCoolr);