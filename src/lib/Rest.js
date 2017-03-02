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

fetch('http://btgarant.dev/api/workbench', {
  credentials: 'same-origin',
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6ImJ0dXNlcjEiLCJmdWxsX25hbWUiOiJidHVzZXIxIiwiZXhwIjoxNDg2NTcxMzIxLCJyZWZyZXNoVG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlKOS5leUpsZUhBaU9qRTBPRFkyTlRReE1qRXNJbWxoZENJNk1UUTROalUyTnpjeU1YMC5EX09SZEM3YXFMSHZwaXBBNWw3WGtDdW44ZWJtX1hBTGRYeVpvTDEzNG5MeFZOdEdFNjdPUnFQUTFnb3JKWk1JVW1jZzlaYVZ4S2M5bkRWelF3blRxb09sSkZiZ1BYeFdOcXk4NmJxSzJ1ZWktMHpNTFBkVjJDMXFsRWVhdGZKbEtSVVFxNUxzNTB1Wm5xTDU5OGJxeVJiODc4dDNremJlVXNzVnN6U2tIa3RTdUR1UE9JV1lkblZsOUptaDBvb19Ra0tFUkpqMTBxZmtwcVdwekd5REpaaDM4cFJnTVNiWG5Tb0ZKOUtXWF81Y1FMOHVOaGhrZ0hybzdPbW1LWkZuNXBxZ2dXRDc5RVRYRXdZM1lTa0JrWmYxRnJhSFA5aGdwSl9LcFc1cXlKNFc5TEhzZ3hRem9Xb2MwVVA4VWxERVhjdWpYTlgtWWQ0YVdMU1g1Q05pZUtXSjc0aEw1TGwwenI1REFMWk5HTUVxcXV3YndHUGRIeF9Fb2JCb1dsVUthRWRsQ0JpSndMNTQ3SEwxUE1CYW9xMEVtMThIZ0tKSXZGWkhPamktZExXTGhCVkpjTEI3R0gxOGZlSkJ2VVoyai1NRmFZbGZpQnh2QXZMR3ljZTZBZU8zRnJmNlcya1pwTXdyeUFkRG5zZUNDTy1kMWxKVUViUjZWRnF1dUFLT0VrdUVCb2xGYzFyR3hnWDRzVndFRjFTcF9PM2JuNXlNTlVfeWY0SjlZSllkLVlEUVVMb1FNRzVqYUZ5WW10RWUtTU1DU2ZfZFc0SV9KdmdCT2xHR2Mtdk1pLWtpNFg0RlZwZnIyQURTdGNPYlVobUdUWlFpaXB4QmxTcWR1VWZYOE4zWXhMVk5yVTlabHktMDVPVmZOekxwTERuZUdsd2p5eXZMSE43X3V5OCIsImlhdCI6MTQ4NjU2NzcyMX0.uuA5ktamoKQMYANHmdhtM06bjQh_MtARR8DxX2vSiDvWJ2G1GucKPaXr0URAAeADjPocg_xow1Zco5UEnbSHqfwxFpel6epPfmA1IcMZ6vfcxLHhMXqYeZDH2sRputSRNJpjQkRpptVKArmOVKRh8vSMiXBl01X436L4laefhAvzZK-vTxDKo5faOwiGGUo46b73w2qA9yyLt3ADc6DTKBQgTb699pLFpU8y_3JtYfZXQ98RhJmeZc85WxkCjjUHGQ8YOTrD8IZYv_eGH7E8a208W01aIqwBdSTQPkOYo6sSeN53DU3YiBiCz83XbdFsge5OhgwVNUNhu0fZc8cqtoNvKwf59Hz_UqsezehXashs8JxBnlgJzh4K9Ck3YxKlezaPesI8gleq5QH6WT-wQhh--OK9PUVI6lhQdaXwiRDLHbwjEFgYy9-MnaENUOtjovdnebHInBJG0W_cAxtF_mHufYx6hHhFwSE9LEt62jw0GVJdoOqoIEUDuSjc25vh2xZsb-SOYBh4w0g6wky-ZOZR41nwtIIl4KhdFSUjeT7P9Dk5gj31vz9h9GzQTVmEkF2dKoEvPaOoP8c5RpGah5s1EtAiiBsZ7GO77FlMpJI9K0zmEQL_KQU9MdwYxMBGnHP73tQ06HEBrgheSWfn6TH_6_WC8nDM6X3PByTRisY'
  },
})
