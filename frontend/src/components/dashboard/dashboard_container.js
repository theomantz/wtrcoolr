// src/components/profile/profile.js

import React from 'react';
import './dashboard.css'
import OrganizationList from './organization_list'
import NextCoolr from './next_coolr'


class Dashboard extends React.Component {
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
            <div className="dashboard-container">
                <div className="dashboard-column">
                  <h1 className="column-title" >Organizations</h1>
                  <OrganizationList />                  
                </div>
                <div className="dashboard-column">
                  <h1 className="column-title" >Schedule</h1>
                  <h2 className="column-subtitle">Next Coolr Time</h2>
                  <NextCoolr />
                </div>

              <div className="dashboard-column"><h1 className="column-title" >Trends</h1></div>
            </div>
          );
    }
      
}

export default Dashboard;