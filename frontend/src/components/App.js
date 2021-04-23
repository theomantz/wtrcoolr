// src/components/app.js
import React from 'react';
import Modal from './modal/modal'
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import NavBarContainer from './nav-bar/nav_bar_container';
import CoolrVideoContainer from './coolr_video/coolr_video_container';
import DashboardContainer from './dashboard/dashboard_container';
import AdminContainer from './admin/admin_container';
import CTWWContainer from './match_router/coolr_time_watcher_wrapper_container';
import './css_reset.css'



const App = () => (
  <div>
    <CTWWContainer />
    <Modal />
    <header>
      <NavBarContainer />
    </header>
    <Switch>
      <ProtectedRoute exact path="/" component={DashboardContainer} />
      <ProtectedRoute exact path="/dashboard" component={DashboardContainer} />
      <ProtectedRoute exact path="/admin" component={AdminContainer} />
      <ProtectedRoute exact path="/coolr" component={CoolrVideoContainer} />
      <ProtectedRoute exact path="/admin/:orgId" component={AdminContainer} />
    </Switch>
  </div>
);

export default App;