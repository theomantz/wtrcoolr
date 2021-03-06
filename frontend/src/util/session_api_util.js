import axios from 'axios';

export const setAuthToken = token => {
  if(token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export const signup = (userData) => {
  return axios.post("/api/users/register", userData);
};

export const login = (userData) => {
  return axios.post("/api/users/login", userData);
};

export const logout = user => {
  return axios.patch('/api/users/logout', user)
}

export const demoLogin = demo => {
  return axios.post("/api/users/demoLogin", demo)
}