import { 
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER,
 } from "../actions/session_actions";

 import { 
  UPDATE_USER,
 } from "../actions/users_actions";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const sessionReducer = (state = initialState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case UPDATE_USER:
      let newState = Object.assign({}, state)
      newState['user']['orgs'] = action.currentUser.data.orgs
      return newState
    default:
      return state;
  }
};

export default sessionReducer