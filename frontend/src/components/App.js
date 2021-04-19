// src/components/app.js

import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import Dashboard from './dashboard/dashboard'
import './css_reset.css'



const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />

    </Switch>
  </div>
);

export default App;