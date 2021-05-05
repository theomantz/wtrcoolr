import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import DashboardContainer from '../components/dashboard/dashboard_container';
import Splash from '../components/splash/splash';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      !loggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const Home = ({loggedIn, path, exact}) => (
  <Route
    path={path}
    exact={exact}
    render={(props) => 
      loggedIn ? <DashboardContainer/> : <Splash/>
    }
  />
)

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));

export const HomeRoute = connect(mapStateToProps)(Home);