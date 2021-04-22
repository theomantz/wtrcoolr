import axios from 'axios';

export const usersLoggedIn = () => {
  return axios.get('/api/users/loggedin')
}

export const updateUser = (userData) => {
  return axios.patch('api/users/edit',userData)
}

export const activeUsers = () => {
  return axios.get('api/users/activeUsers')
}


export const searchEmail = (email) => {
  return axios.get(`api/users/email/${email}`)
}