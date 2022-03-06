import axios from '../plugins/axios';

const routes = {
  me: () => axios.get('users'),
  login: data => axios.post('users/login', data),
  register: data => axios.post('users', data),
  update: (data) => axios.put(`users/${data._id}`, data)
};

export default routes;