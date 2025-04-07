import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Picks from './components/Picks';
import ResetPassword from './components/ResetPassword';
import VerifyAccount from './components/VerifyAccount';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/picks" component={Picks} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/verify-account" component={VerifyAccount} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
