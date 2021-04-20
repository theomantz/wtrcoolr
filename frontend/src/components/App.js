// src/components/app.js

import React from 'react';
import Modal from './modal/modal'
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import { Route, Redirect, withRouter } from 'react-router-dom';
import NavBarContainer from './nav-bar/nav_bar_container';
import Dashboard from './dashboard/dashboard'
// import './reset-css.css'



const App = () => (
  <div>
    <Modal />
    <header>
      <NavBarContainer />
    </header>
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  </div>
);

export default App;