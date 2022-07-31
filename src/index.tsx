import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './app/App';
import CustomPersistGate from './app/CustomPersistGate';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './store/store';

ReactDOM.render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <CustomPersistGate>
          <App />
        </CustomPersistGate>
      </Provider>
    </HashRouter>
  </StrictMode>,
  document.getElementById('root')
);

// Add store to window to test it in Cypress
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (window.Cypress) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.store = store;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
