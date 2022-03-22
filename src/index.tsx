import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { HashRouter } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import CustomPersistGate from './app/CustomPersistGate';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
