import React from 'react';
import { Link } from 'react-router-dom'
import './trends.css'


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.checkJoined = this.checkJoined.bind(this)
    this.findOrgIndex = this.findOrgIndex.bind(this)
  }


  handleClick(org,currentUser) {
      return (
        e => {
            e.preventDefault();
            if(!this.checkJoined(org)){
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
                this.props.getPublicOrgs();
            }
            else{
                let orgIndex = this.findOrgIndex(org)
                let orgsArr = currentUser.orgs
                orgsArr.splice(orgIndex,1)
                this.props.updateOrgUsers({
                    userId: currentUser.id,
                    orgId: org._id,
                    admin: false,
                    add: false
                })
                this.props.getPublicOrgs();
                this.props.updateUser({
                    orgs: orgsArr,
                    id: currentUser.id
                })
                this.props.getPublicOrgs();
            }
        }
      )
  }

  checkJoined(org){
      for(let i=0;i<this.props.currentUser.orgs.length;i++){
          if(this.props.currentUser.orgs[i]._id===org._id){
              return true;
          }
      }
      return false;
  }

  findOrgIndex(org){
    for(let i=0;i<this.props.currentUser.orgs.length;i++){
        if(this.props.currentUser.orgs[i]._id===org._id){
            return i
        }
    }
    return -1;
    }

  render() {
      let currentUser = this.props.currentUser
      return (
        <div>
            <div className="most-popular">
            <h2 className="column-subtitle">Most Popular</h2>
                <ul>
                    {this.props.mostPopular.slice(0,4).map((org) => (
                        <li className="org-listing">
                            <button onClick={this.handleClick(org,currentUser)} className="join-org-button">{this.checkJoined(org)? 'Leave': 'Join'}</button>
                            <strong className="org-listing-name">{org.name}</strong>
                        </li> ))
                    }
                </ul>
            </div>
            <div className="most-popular">
            <h2 className="column-subtitle">Trending</h2>
                <ul>
                    {this.props.trending.slice(0,4).map((org) => (
                        <li className="org-listing">
                            <button onClick={this.handleClick(org,currentUser)} className="join-org-button">{this.checkJoined(org)? 'Leave': 'Join'}</button>
                            <strong className="org-listing-name">{org.name}</strong>
                        </li> ))
                    }
                </ul>
            </div>
        </div>
      );
  }
}

export default NavBar;