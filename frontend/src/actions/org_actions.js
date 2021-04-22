import * as APIUtil from "../util/orgs_api_util";


export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_ORGS = 'RECEIVE_ORGS';


const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

const receiveOrgs = orgs => ({
    type: RECEIVE_ORGS,
    orgs,
  });
  


export const createOrg = (org) => (dispatch) => {
  return APIUtil.createOrg(org)
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    });
};

export const getPublicOrgs = () => (dispatch) =>{
    return APIUtil.getPublicOrgs().then(orgs => (
        dispatch(receiveOrgs(orgs))
    ))
}

export const updateOrgUsers = (org) => dispatch => {
    return APIUtil.updateOrgUsers(org)
      .catch((err) => console.log(err))
  }









