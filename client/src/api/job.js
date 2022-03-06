import BaseAPI from "./baseApi";

class JobAPI extends BaseAPI {
  constructor() {
    super('jobs');
  }
}

export default new JobAPI();
