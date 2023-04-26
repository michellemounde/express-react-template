import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';

import * as sessionActions from './store/session';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      <h1>Express React Skeleton</h1>
      {isLoaded && (
        <Switch>
       </Switch>
      )}
    </>
  );
}

export default App;
