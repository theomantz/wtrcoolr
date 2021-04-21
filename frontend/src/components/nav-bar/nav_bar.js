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

  handleClick(type) {
    return () => this.props.openModal(type)
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className="navlinks">
                <Link className="navlink" to={'/dashboard'}>Dashboard</Link>
                <Link className="navlink" to={'/coolr'}>Coolr</Link>
                <Link className="navlink" to={'/profile'}>Orgs</Link>
                <Link className="navlink" to={'/admin'}>Admin</Link>
                <button 
                  className="nav-button" 
                  onClick={this.handleClick('createOrg')}
                  >Create Organization</button>
                <button className="logout" onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div className="navlinks">
                <button 
                  className="nav-button" 
                  onClick={this.handleClick('signup')}
                  >Signup</button>
                <button 
                  className="nav-button" 
                  onClick={this.handleClick('login')}
                  >Login</button>
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