import { connect } from 'react-redux';
import Calendar from './calendar'



const mSTP = state => {
  
  return ({
    orgs: state.session.user.orgs 
  })
}

// entities.users.orgs.map(orgId => {
// entities.orgs[orgId]  }) --> array
// indices 1-4 in the time matches 24 hour digital clock digits

export default connect( mSTP, null)(Calendar);