import axios from 'axios';

export default (userData) => {
  return axios.patch('/api/users/matchUsers', userData)
}

//USER DATA NEEDS TO HAVE userId and orgId
