// src/components/app.js

import React from 'react';
import Modal from './modal/modal'
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import NavBarContainer from './nav-bar/nav_bar_container';
import Dashboard from './dashboard/dashboard'
import './css_reset.css'



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