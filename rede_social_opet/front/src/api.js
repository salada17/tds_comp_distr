import axios from 'axios'

class Client {
  createAccount(data) {
    return axios.post('http://localhost:3001/api/v1/students', data)
  }

  getPosts() {
    const user = JSON.parse(localStorage.getItem('rede_social_opet.user'));
    return axios.get('http://localhost:3001/api/v1/posts', { headers: {'x-access-token': user.token} })
  }
}

export default Client;
