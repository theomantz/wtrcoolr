import React from 'react';
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
        function updateState(onlineMembers,orgMembers){
            let members = this.props.org.members.slice(0,this.props.org.members.length)
            let online = []
            for(let i=0;i<onlineMembers.length;i++){
                if(members.includes(onlineMembers[i]._id)){
                    online.push(onlineMembers[i]._id)
                }
              }

            this.setState({onlineUsersId: online, allUsers: orgMembers})
            console.log(this.state)
            
        }

        
        updateState = updateState.bind(this)
        

        
        async function getActiveUsers(orgId){
            let onlineMembers = await activeUsers().then(users=>(users.data));
            let orgMembers = await getOrgMembers(orgId).then(members=>(members.data))
            
            updateState(onlineMembers,orgMembers)
        }

        if(this.props.org.name){
         getActiveUsers(this.props.org._id)
        }
         
         
    }

    
    
    componentDidMount() {
        // let a = activeUsers().then(users=>(users.data))

        
    }

  

    handleClick(type) {
        return () => this.props.openModal(type)
    }
    
    render() {
        if(this.props.org.name){
          return (
            <div>
                <h1 className="org-name-header">{this.props.org.name}</h1>
                <div className="admin-container">
                    
                    <div className="admin-members-column">
                    <h1 className="column-title" >Members</h1>
                    <ul>
                        {this.state.allUsers.map((user) => (
                            <li className="org-listing">
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