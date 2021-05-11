// src/components/nav/navbar.js

import React from 'react';
import { v4 as uuidv4 } from 'uuid'
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
            <strong
              key={uuidv4()}
              className="navlink"
              onClick={this.handleClick("welcome")}
            >
              About
            </strong>
            <Link key={uuidv4()} className="navlink" to={"/"}>
              Dashboard
            </Link>
            <Link key={uuidv4()} className="navlink" to={"/coolr"}>
              Coolr
            </Link>
            <Link key={uuidv4()} className="navlink" to={"/orgs"}>
              Orgs
            </Link>
            {/* <Link className="navlink" to={'/admin/608054e152211e62fd2b6a17'}>Admin</Link> */}
            <strong
              key={uuidv4()}
              className="navlink"
              onClick={this.handleClick("createOrg")}
            >
              Create Organization
            </strong>
            <strong 
              key={uuidv4()} 
              className="logout" 
              onClick={this.logoutUser}
            >
              Logout
            </strong>
          </div>
        );
      } else {
        return (
          <div className="navlinks">
            <strong
              key={uuidv4()}
              className="navlink"
              onClick={this.handleClick("welcome")}
            >
              About
            </strong>
            <strong
              key={uuidv4()}
              className="navlink"
              onClick={this.handleClick("signup")}
            >
              Signup
            </strong>

            <strong
              key={uuidv4()}
              className="navlink"
              onClick={this.handleClick("login")}
            >
              Login
            </strong>
          </div>
        );
      }
  }

  render() {
      return (
        <div className="navbar">
            <Link to={'/'} className="nav-logo">wtrcoolr</Link>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;