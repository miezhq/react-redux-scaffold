import {
  renderApp,
} from './utils/render';
import './assets/scss/main.scss';
import App from './App';

const element = document.getElementById('root');
renderApp(App, element);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default; // eslint-disable-line
    renderApp(NewApp, element);
  });
}
