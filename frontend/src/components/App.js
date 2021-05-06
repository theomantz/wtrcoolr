// src/components/app.js
import React from 'react';
import Modal from './modal/modal'
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute, HomeRoute } from '../util/route_utils';
import NavBarContainer from './nav-bar/nav_bar_container';
import CTWWContainer from './match_router/coolr_time_watcher_wrapper_container';
import CoolrVideoContainer from './coolr_video/coolr_video_container'
import DashboardContainer from './dashboard/dashboard_container'
import AdminContainer from './admin/admin_container'
import OrgsIndexContainer from './orgs/orgs_index_container'
import './css_reset.css'
import SplashContainer from './splash/splash_container';



const App = () => (
  <div>
    <CTWWContainer />
    <Modal />
    <header>
      <NavBarContainer />
    </header>
    <Switch>
      <HomeRoute exact path="/"/>
      {/* <ProtectedRoute path="/dashboard" component={DashboardContainer} /> */}
      <ProtectedRoute exact path="/admin" component={AdminContainer} />
      <ProtectedRoute exact path="/coolr" component={CoolrVideoContainer} />
      <ProtectedRoute exact path="/admin/:orgId" component={AdminContainer} />
      <ProtectedRoute exact path="/orgs" component={OrgsIndexContainer} />
    </Switch>
  </div>
);

export default App;