import React from 'react';
import './dashboard.css'
import OrganizationList from './organization_list'
import NextCoolr from './next_coolr'
import CalendarContainer from '../calendar/calendar_container'


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
                  <h2 className="column-subtitle">Calendar</h2>
                  <div className="calendar-container"></div>
                </div>

                <div className="dashboard-column">
                    <h1 className="column-title" >Trends</h1>
                    <h2 className="column-subtitle">Most Popular</h2>
                    <h2 className="column-subtitle">Trending</h2>
              </div>
              {/* <CalendarContainer /> */}
            </div>
          );
    }
      
}

export default Dashboard;