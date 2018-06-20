import axios from 'axios';

export default function login(login_key) {
  return axios.post("/users/login", { login_key }).then(response => {
    if (response.data.length === 0) {
      alert('invalid username');
    } else {
      console.log('valid username');
      return response.data[0]._id;
    }
  });
}
