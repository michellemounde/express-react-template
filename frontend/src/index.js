import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import App from './App';

import store from './store';
import { restoreCsrf, csrfFetch } from './store/csrf';

if (process.env.NODE_ENV !== 'production') {
  restoreCsrf();

  window.csrfFetch = csrfFetch;
  window.store = store;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
