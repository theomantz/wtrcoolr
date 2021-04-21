import React from 'react';
import '../dashboard/dashboard.css'
import './admin.css'



class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: []
        }
    }
    
    componentWillMount() {
    }

    componentWillReceiveProps(newState) {
      //  this.setState({ tweets: newState.tweets });
    }   
    
    render() {

          return (
            <div>
                <h1 className="org-name-header">Bowling Group</h1>
                <div className="admin-container">
                    
                    <div className="admin-members-column">
                    <h1 className="column-title" >Members Online</h1>               
                    </div>
                    <div className="coolr-times-column">
                    <h1 className="column-title" >Coolr Times</h1>
                    <h2 className="column-subtitle">Add Coolr Time</h2>
                    <h2 className="column-subtitle">Current Coolr Times</h2>
                    <div className="calendar-container"></div>
                    </div>
                </div>
            </div>
          );
    }
      
}

export default Admin;