import { createAction } from 'redux-actions';
import * as constants from './constants';

const actionName = (namespace, identifier, type, action) =>
  `${namespace}/${type}_${identifier}_${action}`.toUpperCase();

const genericAction = (namespace, identifier, type, action) =>
  createAction(actionName(namespace, identifier, type, action));

const start = (namespace, identifier, type) =>
  genericAction(namespace, identifier, type, constants.STATUS_START);

const success = (namespace, identifier, type) =>
  genericAction(namespace, identifier, type, constants.STATUS_SUCCESS);

const error = (namespace, identifier, type) =>
  genericAction(namespace, identifier, type, constants.STATUS_ERROR);

export const asyncRequest = (method, namespace, identifier, func) => {
  const [
    requestStart,
    requestSuccess,
    requestError,
  ] = [start, success, error].map((fn) => fn(namespace, identifier, method));

  return (...params) => (dispatch) => {
    dispatch(requestStart());

    return func(...params)
      .then((response) => {
        dispatch(requestSuccess(response));
        return response;
      })
      .catch((err) => {
        dispatch(requestError(err));
        return Promise.reject(err);
      });
  };
};

export const getById = (namespace, identifier, fn) =>
  asyncRequest(constants.ACTION_FETCH, namespace, identifier, fn);

export const getlist = (namespace, identifier, listItems) =>
  asyncRequest(constants.ACTION_LIST, namespace, identifier, listItems);

export const postData = (namespace, identifier, fn) =>
  asyncRequest(constants.ACTION_POST, namespace, identifier, fn);
