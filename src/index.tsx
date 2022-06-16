import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './app/App';
import CustomPersistGate from './app/CustomPersistGate';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './store/store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <CustomPersistGate>
          <App />
        </CustomPersistGate>
      </Provider>
    </HashRouter>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
