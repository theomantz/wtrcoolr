import axios from 'axios';

export default (matchData) => {
  console.log(matchData)
  return axios.patch('/api/users/matchUsers', matchData)
}

