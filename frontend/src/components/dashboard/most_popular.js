import React from 'react';
import { Link } from 'react-router-dom'


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }


  handleClick(org,currentUser) {
      return (
        e => {
            e.preventDefault();
            let orgsArr = currentUser.orgs
            orgsArr.push(org)
            this.props.updateOrgUsers({
                userId: currentUser.id,
                orgId: org._id,
                admin: false,
                add: true
            })
            this.props.getPublicOrgs();
            this.props.updateUser({
                orgs: orgsArr,
                id: currentUser.id
            })
        }
      )
  }

  render() {
      let currentUser = this.props.currentUser
      return (
        <div className="most-popular">
            <ul>
                {this.props.mostPopular.slice(0,10).map((org) => (
                    <li className="org-listing">
                        <button onClick={this.handleClick(org,currentUser)} className="join-org-button">{currentUser.orgs.includes(org)? 'Leave': 'Join'}</button>
                        <strong>{org.name}</strong>
                    </li> ))
                }
            </ul>
        </div>
      );
  }
}

export default NavBar;