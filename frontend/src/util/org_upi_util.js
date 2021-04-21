import axios from 'axios';

export const createOrg = (orgData) => {
  return axios.post("/api/orgs/", orgData);
};

export const getPublicOrgs = () => {
    return axios.get("/api/publicOrgs/");
  };