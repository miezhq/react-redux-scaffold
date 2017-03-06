import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

function renderWithHotReloadContainer(Component, rootElement) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootElement,
  );
}

function renderWithoutHotReloadContainer(Component, rootElement) {
  ReactDOM.render(
    <Component />,
    rootElement,
  );
}

export function renderApp(Component, rootElement) {
  if (process.env.NODE_ENV === 'development') {
    renderWithHotReloadContainer(Component, rootElement);
  } else {
    renderWithoutHotReloadContainer(Component, rootElement);
  }
}
