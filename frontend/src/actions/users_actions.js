import * as APIUsersUtil from '../util/users_util';
import {getPublicOrgs} from './org_actions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const UPDATE_USER = 'UPDATE_USER';


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







