import { configureStore } from '@reduxjs/toolkit';

import sessionReducer from './session';

const rootReducer = ({
  session: sessionReducer
});

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== 'production') {
      const logger = require('redux-logger');
      return getDefaultMiddleware().concat(logger)
    }
  },
  preloadedState
})

export default store;
