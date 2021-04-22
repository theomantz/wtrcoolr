import React from 'react';
import { Link } from 'react-router-dom'


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit(org,currentUser) {
      return (
        e => {
            e.preventDefault();
            let orgsArr = currentUser.orgs
            orgsArr.push(org)
            this.props.updateUser({
                orgs: orgsArr,
                id: currentUser.id
            }).then(this.setState(this.state))
        }
      )
  }

  render() {
      return (
        <div className="most-popular">
            <ul>
                {this.props.mostPopular.slice(0,10).map((org) => (
                    <li className="org-listing">
                        <button onClick={this.handleSubmit(org,this.props.currentUser)} className="join-org-button">Join</button>
                        <strong>{org.name}</strong>
                    </li> ))
                }
            </ul>
        </div>
      );
  }
}

export default NavBar;