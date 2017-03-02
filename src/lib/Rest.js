import fetch from 'isomorphic-fetch';
import Promise from 'es6-promise';
import Url from 'url';
import { omit, keys, merge } from 'lodash';
import Route from 'route-parser';

export default class Rest {

  /**
   * @param baseUrl {String}
   * @param options {Object}
   */
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl;
    this.options = merge({
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }, options);
  }

  /**
   * Set header value
   *
   * @param name {String}
   * @param value {String}
   * @return {Rest}
   */
  setHeader(name, value) {
    this.options.headers[name] = value;
    return this;
  }

  /**
   * Remove header
   *
   * @param name {String}
   */
  removeHeader(name) {
    delete this.options.headers[name];
  }

  setBearerAuthenticationToken(token) {
    if (token) {
      this.setHeader('Authorization', `Bearer ${token}`);
    }
  }

  /**
   * @param path {String}
   * @param params {Object}
   * @param headers {Object}
   * @returns {Promise}
   */
  head(path, params, headers) {
    return this.request({ path, params, method: 'HEAD', headers });
  }

  /**
   * @param path {String}
   * @param params {Object}
   * @param headers {Object}
   * @returns {Promise}
   */
  get(path, params, headers = {}) {
    return this.request({ path, params, method: 'GET', headers });
  }

  /**
   * @param path {String}
   * @param params {Object}
   * @param headers {Object}
   * @returns {Promise}
   */
  post(path, params, headers = {}) {
    return this.request({ path, params, method: 'POST', headers });
  }

  /**
   * @param path {String}
   * @param params {Object}
   * @param headers {Object}
   * @returns {Promise}
   */
  put(path, params, headers = {}) {
    return this.request({ path, params, method: 'PUT', headers });
  }

  /**
   * @param path {String}
   * @param params {Object}
   * @param headers {Object}
   * @returns {Promise}
   */
  patch(path, params, headers = {}) {
    return this.request({ path, params, method: 'PATCH', headers });
  }

  /**
   * @param path {String}
   * @param params {Object}
   * @param headers {Object}
   * @returns {Promise}
   */
  del(path, params, headers = {}) {
    return this.request({ path, params, method: 'DELETE', headers });
  }

  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  static parseJSON(response) {
    return response.json();
  }

  static parseText(response) {
    return response.text();
  }

  static responseParser(response) {
    let parser;

    const contentType = response.headers.get('Content-Type');

    switch (contentType) {
      case (contentType.match(/application\/json/) || {}).input:
        parser = Rest.parseJSON;
        break;
      default:
        parser = Rest.parseText;
        break;
    }

    return parser(response);
  }

  request({ method, path, params = {}, headers = {} }) {
    const route = new Route(path);
    let endpoint = route.reverse(params);

    const keysToOmit = keys(route.match(endpoint));
    const reqParams = keysToOmit.length ? omit(params, keysToOmit) : params;
    endpoint = Url.resolve(this.baseUrl, endpoint);

    const options = merge(this.options, {
      method: method.toUpperCase(),
      headers,
    });

    if (method.toUpperCase() === 'GET') {
      const parsedUrlData = Url.parse(endpoint);
      parsedUrlData.query = merge(parsedUrlData.query, reqParams);
      endpoint = Url.format(parsedUrlData);
    } else if (options.headers['Content-Type'].match(/application\/x-www-form-urlencoded/)) {
      options.body = new FormData(reqParams);
    } else if (options.headers['Content-Type'].match(/application\/json/)) {
      options.body = JSON.stringify(reqParams);
    }

    return fetch(endpoint, options)
      .then(Rest.checkStatus)
      .then(Rest.responseParser);
  }
}
