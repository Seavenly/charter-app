import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from '@src/App';
import registerServiceWorker from '@src/registerServiceWorker';

const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);
registerServiceWorker();

declare const module: any;
if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App').default);
  });
}
