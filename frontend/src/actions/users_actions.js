import * as APIUsersUtil from '../util/users_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export const fetchUsers = () => dispatch => {
  return APIUsersUtil.usersLoggedIn()
    .then(users => dispatch(receiveUsers(users)))
    .catch((err) => console.log(err))
}