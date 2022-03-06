import axios from '../plugins/axios';

export default class BaseAPI {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  list(query) {
    const searchParams = new URLSearchParams(query).toString();
    return axios.get(`${this.endpoint}${query ? '?' + searchParams : ''}`);
  }

  getOne(id, query) {
    const searchParams = new URLSearchParams(query).toString();
    return axios.get(`${this.endpoint}/${id}${query ? '?' + searchParams : ''}`);
  }

  create(item) {
    return axios.post(`${this.endpoint}`, item);
  }

  update(item) {
    return axios.put(`${this.endpoint}/${item._id}`, item);
  }

  delete(id) {
    return axios.delete(`${this.endpoint}/${id}`);
  }
}