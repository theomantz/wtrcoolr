import axios from 'axios';

export default (userId, orgId) => {
  return axios.patch('/api/users/matchUsers', {userId, orgId})
}

//USER DATA NEEDS TO HAVE userId and orgId
