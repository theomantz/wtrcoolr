import {
  ADD_CURRENT_COOLRS,
  REMOVE_CURRENT_COOLRS
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
    default:
      return state;
  }
};

export default coolrReducer