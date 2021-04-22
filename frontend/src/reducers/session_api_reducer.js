import { 
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER,
 } from "../actions/session_actions";

 import { 
  UPDATE_USER,
 } from "../actions/users_actions";

 import {
   RECEIVE_MATCH
 } from '../actions/match_actions'

const initialState = {
  isAuthenticated: false,
  user: {},
  match: {}
};

const sessionReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
        match: {}
      };
    case UPDATE_USER:
      let newState = Object.assign({},state)
      newState['user']['orgs'] = action.currentUser.data.orgs
      return newState
    case RECEIVE_MATCH:
      return Object.assign({}, state, {match: action.matchData})
    case CLEAR_MATCH:
      return Object.assign({}, state, {match: {}})
    default:
      return state;
  }
};

export default sessionReducer



// {user: action.currentUser.data.orgs}