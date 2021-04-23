import matchUsers from '../util/match_util';

export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_MATCH = "RECEIVE_MATCH";
export const CLEAR_MATCH = 'CLEAR_MATCH';
export const ADD_CURRENT_COOLRS = "ADD_CURRENT_COOLRS";
export const REMOVE_CURRENT_COOLRS = "REMOVE_CURRENT_COOLRS";
export const PAUSE_COUNTER = "PAUSE_COUNTER"
export const UNPAUSE_COUNTER = "UNPAUSE_COUNTER"

export const receieveMatch = (matchData) => ({
  type: RECEIVE_MATCH,
  matchData
})

export const clearMatch = () => ({
  type: CLEAR_MATCH
})

export const pauseCounter = () => ({
  type: PAUSE_COUNTER
})

export const unpauseCounter = () => ({
  type: UNPAUSE_COUNTER
})

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const addCurrentCoolrs = (currentCoolrs) => ({
  type: ADD_CURRENT_COOLRS,
  currentCoolrs
})

export const removeCurrentCoolrs = (currentCoolrs) => ({
  type: REMOVE_CURRENT_COOLRS,
  currentCoolrs
})

export const queryMatch = (userData) => dispatch => {
  return (
    matchUsers(userData)
      .then(matchData => dispatch(receieveMatch(matchData)))
      .catch(errs => dispatch(receiveErrors(errs)))
  )
}

