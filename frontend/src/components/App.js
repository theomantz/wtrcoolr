// src/components/app.js

import React from 'react';
import Modal from './modal/modal'
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import NavBarContainer from './nav-bar/nav_bar_container';
import CoolrVideoContainer from './coolr_video/coolr_video_container'
import Dashboard from './dashboard/dashboard'
import Admin from './admin/admin'
import './css_reset.css'



const App = () => (
  <div>
    <Modal />
    <header>
      <NavBarContainer />
    </header>
    <Switch>
      
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/admin" component={Admin} />
      <ProtectedRoute exact path="/coolr" component={CoolrVideoContainer} />

    </Switch>
  </div>
);

export default App;