import matchUsers from '../util/match_util';

export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_MATCH = "RECEIVE_MATCH";
export const CLEAR_MATCH = 'CLEAR_MATCH'

export const receieveMatch = (matchData) => ({
  type: RECEIVE_MATCH,
  matchData
})

export const clearMatch = () => ({
  type: CLEAR_MATCH
})

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const queryMatch = (userData) => dispatch => {
  return (
    matchUsers(userData)
      .then(matchData => dispatch(receieveMatch(matchData)))
      .catch(errs => dispatch(receiveErrors(errs)))
  )
}

