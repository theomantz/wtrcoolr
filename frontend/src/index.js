import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import { setAuthToken } from './util/session_api_util'
import { logout } from './actions/session_actions'
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";

document.addEventListener("DOMContentLoaded", () => {

  let store;
  
  if (localStorage.jwtToken) {

    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);

    const demoUsers = ['demo@example.com', 'demo3@example.com']

    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout(decodedUser));
      window.location.href = "/#/";
    }

    if( demoUsers.includes(decodedUser.email) ) {
      window.addEventListener('beforeunload', e => {
        e.preventDefault()
        store.dispatch(logout(decodedUser))
      })
    }

    
  } else {
    
    store = configureStore({});

  }

  
  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store}/>, root);
});
