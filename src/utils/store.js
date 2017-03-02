import { createAction } from 'redux-actions';
import immutable from 'immutable';
import _ from 'lodash';

const ACTION_START = 'START';
const ACTION_SUCCESS = 'SUCCESS';
const ACTION_ERROR = 'ERROR';

const METHOD_FETCH = 'FETCH';
const METHOD_LIST = 'LIST';
const METHOD_POST = 'POST';

const INITIAL_STATE = immutable.Map({});

const actionName = (namespace, entity, type, action) =>
  `${namespace}/${type}_${entity}_${action}`.toUpperCase();

const genericAction = (namespace, entity, type, action) =>
  createAction(actionName(namespace, entity, type, action));

const start = (namespace, entity, type) => genericAction(namespace, entity, type, ACTION_START);
const success = (namespace, entity, type) => genericAction(namespace, entity, type, ACTION_SUCCESS);
const error = (namespace, entity, type) => genericAction(namespace, entity, type, ACTION_ERROR);

const asyncRequest = (method, namespace, entity, func) => {
  const [
    requestStart,
    requestSuccess,
    requestError,
  ] = [start, success, error].map((fn) => fn(namespace, entity, method));

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

const selector = (namespace, entity, type) => {
  const storePath = ['domain', _.camelCase(namespace), _.camelCase(entity), type];
  return (state) => {
    const val = state.getIn(storePath);
    return val ? val.toJS() : null;
  };
};

export const createSelectors = (namespace, entity) => {
  const [
    itemSelector,
    itemsSelector,
    errorSelector,
    pendingSelector,
  ] = ['data', 'items', 'error', 'pending'].map((type) => selector(namespace, entity, type));

  return {
    item: itemSelector,
    items: itemsSelector,
    error: errorSelector,
    pending: pendingSelector,
  };
};

export const asyncGetById = (namespace, entity, getById) => asyncRequest(METHOD_FETCH, namespace, entity, getById);

export const asyncList = (namespace, entity, listItems) => asyncRequest(METHOD_LIST, namespace, entity, listItems);

export const asyncPost = (namespace, entity, postData) => asyncRequest(METHOD_POST, namespace, entity, postData);

export const reducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  const actionTypeRegExp =
    new RegExp('([A-Z0-9_]+)\/' + // eslint-disable-line
      `(${METHOD_FETCH}|${METHOD_LIST}|${METHOD_POST})` +
      '\_([A-Z\_]+)_' + // eslint-disable-line
      `(${ACTION_SUCCESS}|${ACTION_ERROR}|${ACTION_START})`);

  const matchResult = type.match(actionTypeRegExp);

  if (matchResult) {
    const [
      match, // eslint-disable-line
      namespace,
      method, // eslint-disable-line
      entity,
      actionType,
    ] = matchResult;

    const storePath = [_.camelCase(namespace), _.camelCase(entity)];

    if (actionType === ACTION_START) {
      return state.mergeIn(storePath, immutable.fromJS({
        pending: true,
        ts: new Date(),
      }));
    }

    if (actionType === ACTION_SUCCESS) {
      return state.mergeIn(storePath, immutable.fromJS({
        pending: false,
        data: payload,
        ts: new Date(),
      }));
    }

    if (actionType === ACTION_ERROR) {
      return state.mergeIn(storePath, immutable.fromJS({
        pending: false,
        data: null,
        error: payload,
        ts: new Date(),
      }));
    }
  }

  return state;
};
