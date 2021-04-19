// src/components/nav/navbar.js

import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className="navlinks">
                <Link className="navlink" to={'/tweets'}>Dashboard</Link>
                <Link className="navlink" to={'/profile'}>Orgs</Link>
                <button className="logout" onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div className="navlinks">
                <Link className="navlink" to={'/signup'}>Signup</Link>
                <Link className="navlink" to={'/login'}>Login</Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div className="navbar">
            <div className="nav-logo"><h1>wtrcoolr</h1></div>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;