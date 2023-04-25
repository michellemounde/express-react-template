import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import sessionReducer from './session';

const rootReducer = ({
  session: sessionReducer
});

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== 'production') {
      return getDefaultMiddleware().concat(logger)
    }
  },
  preloadedState
})

export default store;
