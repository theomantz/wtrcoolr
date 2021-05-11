import {
  ADD_TO_NOTIFIED,
  REMOVE_NOTIFIED_COOLRS,
  CLEAR_NOTIFIED_COOLRS
} from '../actions/match_actions';


const notifiedOfCoolrReducer = (state = [], action) => {
  Object.freeze(state)
  switch (action.type) {
    case ADD_TO_NOTIFIED:
      let newState = state.concat(action.coolrHours);
      return newState;
    case REMOVE_NOTIFIED_COOLRS:
      let altState = state.concat([]);
      return altState.filter(
        clr => !action.notifiedCoolrs.includes(clr)
      );
    case CLEAR_NOTIFIED_COOLRS:
      let clearState = []
      return clearState;
    default:
      return state;
  }
};

export default notifiedOfCoolrReducer;