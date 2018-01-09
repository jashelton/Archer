import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'; // LEARN: What is this?
import { store } from './helpers';
import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

render((
  <Provider store={store}>
      <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
