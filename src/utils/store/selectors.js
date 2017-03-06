import { camelCase } from 'lodash';
import { createSelector } from 'reselect';
import * as constants from './constants';

const selector = (namespace, identifier, type) => {
  const storePath = ['domain', camelCase(namespace), camelCase(identifier), type];
  return (state) => state.getIn(storePath);
};

const createTypeSelectors = (namespace, identifier, type) => {
  const [
    dataSelector,
    errorSelector,
    statusSelector,
    timestampSelector,
  ] = [
    constants.PROPERTY_DATA,
    constants.PROPERTY_ERROR,
    constants.PROPERTY_STATUS,
    constants.PROPERTY_TIMESTAMP,
  ].map((field) =>
      createSelector(
        selector(namespace, identifier, type),
        (data) => (data && data.get(field) ? data.get(field).toJS() : null),
      ),
    );

  const isLoading = createSelector(
    selector(namespace, identifier, type),
    (data) =>
      (data && data.get('status')
        ? data.get('status') === constants.ACTION_STATUS_RUNNING
        : false),
  );

  return {
    data: dataSelector,
    error: errorSelector,
    status: statusSelector,
    timestamp: timestampSelector,
    isLoading,
  };
};

export const createItemSelectors = (namespace, identifier) =>
  createTypeSelectors(namespace, identifier, constants.RESOURCE_TYPE_ITEM);

export const createListSelectors = (namespace, identifier) =>
  createTypeSelectors(namespace, identifier, constants.RESOURCE_TYPE_LIST);

export const createPostResultSelectors = (namespace, identifier) =>
  createTypeSelectors(namespace, identifier, constants.RESOURCE_TYPE_MUTATION_RESULT);
