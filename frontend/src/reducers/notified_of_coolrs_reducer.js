import {
  ADD_TO_NOTIFIED,
} from '../actions/match_actions';


const notifiedOfCoolrReducer = (state = [], action) => {
  Object.freeze(state)
  switch (action.type) {
    case ADD_TO_NOTIFIED:
      let newState = state.concat(action.coolrHours);
      return newState;
    default:
      return state;
  }
};

export default notifiedOfCoolrReducer;