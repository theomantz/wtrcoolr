import React from 'react';
import '../dashboard/dashboard.css'
import './admin.css'
import {activeUsers} from '../../util/users_api_util'
import ManageCoolrTimesContainer from '../manage_coolr_times/manage_coolr_times_container';



class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            onlineUsers: [],
            org: this.props.org
        }
        window.adminOrgId = this.props.org._id
        function updateState(data){
            let members = this.props.org.members.slice(0,this.props.org.members.length)
            let online = []
            for(let i=0;i<data.length;i++){
                if(members.includes(data[i]._id)){
                    online.push(data[i])
                }
              }

            this.setState({onlineUsers: online})
            //this.setState({onlineUsers: data})
            
        }

        updateState = updateState.bind(this)

        
        async function getActiveUsers(){
            let aU = await activeUsers().then(users=>(users.data));
            updateState(aU)
        }

        if(this.props.org.name){
         getActiveUsers()
        }
         
         
    }

    
    
    componentWillMount() {
        // let a = activeUsers().then(users=>(users.data))
       
        
    }

    componentWillReceiveProps(newState) {
      //  this.setState({ tweets: newState.tweets });
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
                    <h1 className="column-title" >Members Online</h1>
                    <ul>
                        {this.state.onlineUsers.slice(0,5).map((user) => (
                            <li className="org-listing">
                                <strong>{user.name}</strong>
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