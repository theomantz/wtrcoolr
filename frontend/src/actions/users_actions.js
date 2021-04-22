import * as APIUsersUtil from '../util/users_util';
import {
  RECEIVE_CURRENT_USER
} from '../actions/session_actions'

export const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  }
}

const receiveUser = currentUser => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  }
}

export const fetchUsers = () => dispatch => {
  return APIUsersUtil.usersLoggedIn()
    .then(users => dispatch(receiveUsers(users)))
    .catch((err) => console.log(err))
}

export const assignSocket = userData => dispatch => {
  return APIUsersUtil.assignSocket(userData)
    .then(user => dispatch(receiveUser(user)))
    .catch(err => console.log(err))
}