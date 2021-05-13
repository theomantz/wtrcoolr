import axios from 'axios';

export const matchUsers = matchData => {
  console.log(matchData)
  return axios.patch('/api/users/matchUsers', matchData)
}

export const matchInterests = (userId) => {
  console.log(userId)
  return axios.get(`/api/users/interests/${userId}`)
}

export const removeInterests = (userId) => {
  return axios.patch('/api/users/interests')
}