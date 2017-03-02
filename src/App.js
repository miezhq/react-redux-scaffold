import React from 'react';
import Immutable from 'immutable';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import configureStore from './store';
import GenericPage from './modules/main/pages/GenericPage';

export default function App() {
  const appStore = configureStore(Immutable.Map({}));
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Route component={GenericPage} />
      </BrowserRouter>
    </Provider>
  );
}
