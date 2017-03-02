import {
  renderWithHotReloadContainer,
  renderWithouthHotReloadContainer,
} from './utils/render';
import './assets/scss/main.scss';
import App from './App';

const element = document.getElementById('root');

if (process.env.NODE_ENV === 'development') {
  renderWithHotReloadContainer(App, element);
} else {
  renderWithouthHotReloadContainer(App, element);
}

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default; // eslint-disable-line
    renderWithHotReloadContainer(NewApp, element);
  });
}
