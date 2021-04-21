import axios from 'axios';

export const usersLoggedIn = () => {
  return axios.get('/api/users/loggedin')
}
