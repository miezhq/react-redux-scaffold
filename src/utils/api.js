import Api from '../lib/Api';

let apiInstance;

/**
 * Get Api instance
 *
 * @return {Api}
 */
function getApi() {
  if (!apiInstance) {
    apiInstance = new Api({
      endpoint: __API_ENDPOINT__,
    });
  }

  return apiInstance;
}

export default getApi();
