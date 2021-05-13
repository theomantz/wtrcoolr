import { matchUsers, matchInterests, removeInterests } from '../util/match_util';
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
export const CLEAR_NOTIFIED_COOLRS = "CLEAR_NOTIFIED_COOLRS";
export const RECEIVE_MATCH_INTERESTS = "RECEIVE_MATCH_INTERESTS";
export const CLEAR_MATCH_INTERESTS = "CLEAR_MATCH_INTERESTS";
export const START_WAITING = "START_WAITING";
export const STOP_WAITING = "STOP_WAITING";

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

export const receiveMatchInterests = (pojo) => ({
  type: RECEIVE_MATCH_INTERESTS,
  pojo
})

export const clearMatchInterests = () => ({
  type: CLEAR_MATCH_INTERESTS
})

export const startWaiting = () => ({
  type: START_WAITING
})

export const stopWaiting = () => ({
  type: STOP_WAITING
})

export const removeMatchInterests = (userId) => dispatch => {
  return (
    removeInterests(userId)
      .then(() => dispatch(clearMatchInterests()))
      .catch(errs => {
        dispatch(receiveErrors(errs));
      })
  )
};

export const queryInterests = (userId) => dispatch => {
  return (
    matchInterests(userId)
      .then(interests => {
        dispatch(receiveMatchInterests({
          interests: interests.data.interests,
          nonStarters: interests.data.nonStarters,
          userName: interests.data.username
        }))
      })
      .catch(errs => {
        dispatch(receiveErrors(errs));
      })
  )
};

export const queryMatch = (matchData) => dispatch => {  
  return (
    matchUsers(matchData)
      .then(matchEmail => {
        dispatch(receieveMatch(matchEmail.data.email));
        if (matchEmail.data.email !== 'available') {
          dispatch(receiveMatchInterests({
            interests: matchEmail.data.interests,
            nonStarters: matchEmail.data.nonStarters,
            userName: matchEmail.data.username
          }))       
        } else {
          dispatch(startWaiting())
        }
      })
      .catch(errs => {
        dispatch(receiveErrors(errs));
      })
  )
}

