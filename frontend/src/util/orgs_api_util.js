import axios from 'axios';

export const createOrg = (orgData) => {
  return axios.post("/api/orgs/", orgData);
};

export const getPublicOrgs = () => {
    return axios.get("/api/orgs/publicOrgs/");
  };

export const updateOrgUsers = (orgData) => {
    return axios.patch('api/orgs/updateUsers',orgData)
}

export const editOrg = (orgData) => {
  return axios.patch('api/orgs/edit',orgData)
}