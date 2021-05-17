import React from 'react';
import { v4 as uuidv4 } from 'uuid'
import '../dashboard/dashboard.css'
import './admin.css'
import {getOrgMembers} from '../../util/orgs_api_util'
import {activeUsers} from '../../util/users_api_util'
import ManageCoolrTimesContainer from '../manage_coolr_times/manage_coolr_times_container';



class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            onlineUsersId: [],
            org: this.props.org,
            allUsers: []
        }
        window.adminOrgId = this.props.org._id
        
    
        this.updateState = this.updateState.bind(this)
        this.callUpdate = this.callUpdate.bind(this)
        this.getActiveUsers = this.getActiveUsers.bind(this)


        window.callUpdate = this.callUpdate;
        

        if(this.props.org.name){
            this.getActiveUsers(this.props.org._id)
        }
         
         
    }

    updateState(onlineMembers,orgMembers){
        let members = this.props.org.members.slice(0,this.props.org.members.length)
        let online = []
        for(let i=0;i<onlineMembers.length;i++){
            if(members.includes(onlineMembers[i]._id)){
                online.push(onlineMembers[i]._id)
            }
          }

        this.setState({onlineUsersId: online, allUsers: orgMembers})
        
    }


    async getActiveUsers(orgId){
        let onlineMembers = await activeUsers().then(users=>(users.data));
        let orgMembers = await getOrgMembers(orgId).then(members=>(members.data))
        this.updateState(onlineMembers,orgMembers)
    }

    callUpdate(){
        this.getActiveUsers(this.props.org._id)
    }
    


    handleClick(type) {
        return () => this.props.openModal(type,this.callUpdate)
    }
    
    render() {
        if(this.props.org.name){
          return (
            <div className='admin-page-container'>
                <h1 className="org-name-header">{this.props.org.name}</h1>
                <div className="admin-container">
                    
                    <div className="admin-members-column">
                    <h1 onClick={this.callUpdate} className="column-title" >Members</h1>
                    <ul className='members-list-container'>
                        {this.state.allUsers.map((user) => (
                            <li className="org-listing" key={uuidv4()}>
                                <strong>{user.name}</strong> 
                                <span className="user-online">
                                    {this.state.onlineUsersId.includes(user._id)? "online" : "offline"}
                                </span>
                            </li> ))
                        }
                    </ul>
                    <button onClick={this.handleClick('addMember')} className="add-member-button">Add member</button>               
                    </div>
                    <div className="coolr-times-column">
                    <h1 className="column-title" >Coolr Times</h1>
                    <h2 className="column-subtitle">Add Coolr Time</h2>
                        <ManageCoolrTimesContainer org={this.props.org} user={this.props.user}/>
                    </div>
                </div>
            </div>
          );
        }
        else{
            return (
                <h1 className="unauthorized">Unauthorized or doesn't exist.</h1>
            )
        }
    }
      
}

export default Admin;