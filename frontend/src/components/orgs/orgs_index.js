import React from 'react';
import './org_index.css'


class OrgsIndex extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.checkJoined = this.checkJoined.bind(this)
        this.findOrgIndex = this.findOrgIndex.bind(this)
        this.props.getPublicOrgs();
    }

    componentWillMount() {
        this.props.getPublicOrgs();
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
            <div className="org-index">
                <h1>Public Organizations</h1>
                <ul>
                    {this.props.orgs.map((org) => (
                        <li className="org-index-listing">
                            <button onClick={this.handleClick(org,currentUser)} className="join-org-button">{this.checkJoined(org)? 'Leave': 'Join'}</button>
                            <strong>{org.name}</strong>
                        </li> ))
                    }
                </ul>
            </div>
          );
    }
      
}

export default OrgsIndex;