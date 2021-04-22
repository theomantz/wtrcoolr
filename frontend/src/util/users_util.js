import axios from 'axios';

export const usersLoggedIn = () => {
  return axios.get('/api/users/loggedin')
}

export const assignSocket = userData => {
  return axios.patch('/api/users/sockets', userData)
}

export const nullifySocket = user => {
  return axios.patch('/api/users/sockets/null', user)
}

export const fetchSocket = email => {
  return axios ({
    method: 'GET',
    url: `/api/users/sockets/${email}`}) 
}