import matchUsers from '../util/match_util';
import { receiveErrors } from './session_actions';


export const RECEIVE_MATCH = "RECEIVE_MATCH";
export const CLEAR_MATCH = 'CLEAR_MATCH';
export const ADD_CURRENT_COOLRS = "ADD_CURRENT_COOLRS";
export const REMOVE_CURRENT_COOLRS = "REMOVE_CURRENT_COOLRS";
export const PAUSE_COUNTER = "PAUSE_COUNTER";
export const UNPAUSE_COUNTER = "UNPAUSE_COUNTER";
export const RECEIVE_ROUTED = "RECEIE_ROUTED";
export const PROMPTED_USER = "PROMPTED_USER";
export const ADD_TO_NOTIFIED = "MOVE_TO_NOTIFIED";
export const SET_MATCH_ATTEMPTED = "SET_MATCH_ATTEMPTED";
export const REMOVE_NOTIFIED_COOLRS = "REMOVE_NOTIFIED_COOLRS";
export const CLEAR_CURRENT_COOLRS = "CLEAR_CURRENT_COOLRS";
export const CLEAR_NOTIFIED_COOLRS = "CLEAR_NOTIFIED_COOLRS"


export const receieveMatch = (matchEmail) => ({
  type: RECEIVE_MATCH,
  matchEmail
})

export const receiveRouted = () => ({
  type: RECEIVE_ROUTED
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

export const addCurrentCoolrs = (currentCoolrs) => ({
  type: ADD_CURRENT_COOLRS,
  currentCoolrs
})

export const removeCurrentCoolrs = (currentCoolrs) => ({
  type: REMOVE_CURRENT_COOLRS,
  currentCoolrs
})

export const clearCurrentCoolrs = () => ({
  type: CLEAR_CURRENT_COOLRS
})

export const addToNotified = (coolrHours) => ({
  type: ADD_TO_NOTIFIED,
  coolrHours
})

export const removeNotifiedCoolrs = (notifiedCoolrs) => ({
  type: REMOVE_NOTIFIED_COOLRS,
  notifiedCoolrs
})

export const clearNotifiedCoolrs = () => ({
  type: CLEAR_NOTIFIED_COOLRS
})

export const queryMatch = (matchData) => dispatch => {  
  return (
    matchUsers(matchData)
      .then(matchEmail => {
        dispatch(receieveMatch(matchEmail.data));       
        return (matchEmail)
      })
      .catch(errs => {
        dispatch(receiveErrors(errs));
        return (errs)
      })
  )
}

