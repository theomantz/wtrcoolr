import axios from 'axios'

export const setActive = (options) => {
  return axios.patch('/api/users/active', options)
}