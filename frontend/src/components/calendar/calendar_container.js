import { connect } from 'react-redux';
import Calendar from './calendar'



const mSTP = state => {
  
  const userOrgs = state.session.user.orgs.map(org => 
    // state.entities.orgs[org.id]
    null
  )
  return ({
    orgs: userOrgs 
  })
}

// entities.users.orgs.map(orgId => {
// entities.orgs[orgId]  }) --> array
// indices 1-4 in the time matches 24 hour digital clock digits

export default connect( mSTP, null)(Calendar);