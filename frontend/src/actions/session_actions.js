import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";
import {getPublicOrgs} from './org_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
  };
};

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const signup = (user) => (dispatch) => {
  return APIUtil.signup(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    });
};

export const login = (user) => (dispatch) => {
  return APIUtil.login(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(getPublicOrgs());
      dispatch(receiveCurrentUser(decoded));      
    })
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    });
};

export const logout = (user) => (dispatch) => {
  return APIUtil.logout(user)
    .then(() => {
      localStorage.removeItem("jwtToken");
      APIUtil.setAuthToken(false);
      dispatch(logoutUser());
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data))
    })
};  
