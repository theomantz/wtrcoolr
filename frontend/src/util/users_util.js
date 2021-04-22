import axios from 'axios';

export const usersLoggedIn = () => {
  return axios.get('/api/users/loggedin')
}

export const assignSocket = userData => {
  return axios.patch('/api/users/sockets', userData)
}
