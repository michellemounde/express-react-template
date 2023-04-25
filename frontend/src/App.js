import { Switch, Route } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage';

import './App.css';

function App() {
  return (
    <>
      <h1>Express React Skeleton</h1>
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
