import * as APIUtil from "../util/org_upi_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";


const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});


export const createOrg = (org) => (dispatch) => {
  return APIUtil.createOrg(org)
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    });
};