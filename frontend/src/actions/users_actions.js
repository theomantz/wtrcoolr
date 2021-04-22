import * as APIUsersUtil from '../util/users_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_SOCKET = 'RECEIVE_SOCKET';

const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  }
}

const receiveSocket = currentUser => {
  return {
    type: RECEIVE_SOCKET,
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
    .then(user => dispatch(receiveSocket(user)))
    .catch(err => console.log(err))
}