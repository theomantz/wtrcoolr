import {RECEIVE_ORGS} from '../actions/org_actions';
  
  const orgsReducer = (state = {}, action) => {
    Object.freeze(state)
    switch(action.type) {
      case RECEIVE_ORGS:
        return action.orgs;
      default:
        return state;
    }
  };
  
  export default orgsReducer;
  