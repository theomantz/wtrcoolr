import axios from 'axios';

export const createOrg = (orgData) => {
  return axios.post("/api/orgs/", orgData);
};