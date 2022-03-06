import BaseAPI from "./baseApi";

class RecruiterAPI extends BaseAPI {
  constructor() {
    super('recruiters');
  }
}

export default new RecruiterAPI();
