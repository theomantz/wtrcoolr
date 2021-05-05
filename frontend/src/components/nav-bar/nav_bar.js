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
      const { user } = this.props
      e.preventDefault();
      this.props.logout(user);
  }

  handleClick(type) {
    return () => this.props.openModal(type)
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className="navlinks">
                <Link className="navlink" to={'/'}>Dashboard</Link>
                <Link className="navlink" to={'/coolr'}>Coolr</Link>
                <Link className="navlink" to={'/orgs'}>Orgs</Link>
                {/* <Link className="navlink" to={'/admin/608054e152211e62fd2b6a17'}>Admin</Link> */}
                <strong 
                  className="navlink" 
                  onClick={this.handleClick('createOrg')}
                  >Create Organization</strong>
                <strong className="logout" onClick={this.logoutUser}>Logout</strong>
            </div>
        );
      } else {
        return (
            <div className="navlinks">
                <strong 
                  className="navlink" 
                  onClick={this.handleClick('signup')}
                  >Signup</strong>
                <strong 
                  className="navlink" 
                  onClick={this.handleClick('login')}
                  >Login</strong>
            </div>
        );
      }
  }

  render() {
      return (
        <div className="navbar">
            <Link to={'/dashboard'} className="nav-logo">wtrcoolr</Link>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;