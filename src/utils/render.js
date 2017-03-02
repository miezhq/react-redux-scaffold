import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

export function renderWithHotReloadContainer(Component, rootElement) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootElement,
  );
}

export function renderWithouthHotReloadContainer(Component, rootElement) {
  ReactDOM.render(
    <Component />,
    rootElement,
  );
}
