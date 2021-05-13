import {
  RECEIVE_MATCH_INTERESTS,
  CLEAR_MATCH_INTERESTS
} from '../actions/match_actions';

const initState = {
  interests: null,
  nonStarters: null,
  username: null
}

export default (state = initState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_MATCH_INTERESTS:
      let newState = Object.assign({}, state, {
        interests: action.pojo.interests,
        nonStarters: action.pojo.nonStarters,
        username: action.pojo.username
      });
      return newState;
    case CLEAR_MATCH_INTERESTS:
      return initState
    default:
      return state;
  }
};