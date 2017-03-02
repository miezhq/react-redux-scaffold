import { applyMiddleware, createStore, compose } from 'redux';

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './root';


const middlewaresUsed = [thunk];
let devTools = null;

const logger = createLogger({
  collapsed: true,
});

middlewaresUsed.push(logger);

  // TODO add Redux DevTools extension
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

export default function () {
  const middleware = applyMiddleware(...middlewaresUsed);

  const composeMiddleware = devTools ? compose(middleware, devTools) : compose(middleware);
  const store = composeMiddleware(createStore)(rootReducer);

  if (module.hot) {
    module.hot.accept(rootReducer, () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
