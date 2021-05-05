import * as APIUsersUtil from '../util/users_api_util';
import {getPublicOrgs} from './org_actions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_SOCKET = 'RECEIVE_SOCKET';
export const REMOVE_SOCKET = 'REMOVE_SOCKET';
export const RECEIVE_USER_MATCH_SOCKET = 'RECEIVE_USER_MATCH_SOCKET'

const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  }
}

const updateCurrentUser = (currentUser) => {
  return {
    type: UPDATE_USER,
    currentUser,
  };
};

const receiveUserSocket = user => {
  return {
    type: RECEIVE_USER_MATCH_SOCKET,
    user
  }
}

const receiveSocket = currentUser => {
  return {
    type: RECEIVE_SOCKET,
    currentUser
  }
}

const removeSocket = () => {
  return {
    type: REMOVE_SOCKET
  }
}


export const fetchUser = () => dispatch => {
  return APIUsersUtil.getUser()
    .then(user => dispatch(updateCurrentUser(user)))
    .catch((err) => console.log(err))
}
export const fetchUsers = () => dispatch => {
  return APIUsersUtil.usersLoggedIn()
    .then(users => dispatch(receiveUsers(users)))
    .catch((err) => console.log(err))
}

export const updateUser = (user) => dispatch => {
  return APIUsersUtil.updateUser(user)
    .then(user => dispatch(updateCurrentUser(user)))
    .catch((err) => console.log(err))
}

export const getUserFromEmail = (email) => dispatch => {
  return APIUsersUtil.searchEmail(email)
}

export const assignSocket = userData => dispatch => {
  return APIUsersUtil.assignSocket(userData)
    .then(user => dispatch(receiveSocket(user)))
    .catch(err => console.log(err))
}

export const nullSocket = user => dispatch => {
  return APIUsersUtil.nullifySocket(user)
    .then(user => dispatch(removeSocket(user)))
    .catch(err => console.log(err))
}

export const fetchSocket = email => dispatch => {
  return APIUsersUtil.fetchSocket(email)
    .then(user => dispatch(receiveUserSocket(user)))
    .catch(err => console.log(err))
}
