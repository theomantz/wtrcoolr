import {
  ADD_CURRENT_COOLRS,
  PROMPTED_USER,
  REMOVE_CURRENT_COOLRS,
  CLEAR_CURRENT_COOLRS
} from '../actions/match_actions';


const coolrReducer = (state = [], action) => {
  Object.freeze(state)
  switch (action.type) {
    case ADD_CURRENT_COOLRS:
      let newState = state.concat(action.currentCoolrs);
      return newState;
    case REMOVE_CURRENT_COOLRS:
      let altState = state.concat([]);
      return altState.filter(
        clr => !action.currentCoolrs.includes(clr)
      );
    case PROMPTED_USER:
      let difState = state.concat([])
      return difState.map( clr => {
        if(action.coolrHours.includes(clr)) {
          return [clr[0], clr[1], {notified: true}] 
        }
      })
    case CLEAR_CURRENT_COOLRS:
      let clearState = []
      return clearState;
    default:
      return state;
  }
};

export default coolrReducer