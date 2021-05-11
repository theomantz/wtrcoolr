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

    componentDidMount(){
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
        if(this.props.orgs.map){
        let currentUser = this.props.currentUser
          return (
            <div className="org-index">
                <div className='org-index-title-container'>
                    <h1>Public Organizations</h1>
                </div>
                <ul className="org-index-container">
                    {this.props.orgs.map((org) => (
                        <li key={org.id} className="org-index-listing">
                            <strong>{org.name}</strong>
                            <button onClick={this.handleClick(org,currentUser)} className="org-index-button">{this.checkJoined(org)? 'Leave': 'Join'}</button>
                        </li> ))}
                </ul>
            </div>
          );}
        else{
            return(
                <div></div>
            )
        }
    }
      
}

export default OrgsIndex;