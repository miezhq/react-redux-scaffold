import Rest from './Rest';

export default class Api {

  constructor(config) {
    this.baseUrl = config.endpoint || '';
    this.accessToken = config.accessToken || '';

    this.adapter = new Rest(this.baseUrl);
  }

  get token() {
    return this.accessToken;
  }

  set token(token) {
    this.accessToken = token;
    this.adapter.setBearerAuthenticationToken(this.accessToken);
  }
}
