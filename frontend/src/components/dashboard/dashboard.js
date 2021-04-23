import React from 'react';
import './dashboard.css'
import OrganizationList from './organization_list'
import NextCoolrContainer from './next_coolr_container'
import MostPopularContainer from './most_popular_container'
import CalendarContainer from '../calendar/calendar_container'



class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
      this.props.getPublicOrgs();
    }
    
    render() {
          return (
            <div className="dashboard-container">
                <div className="dashboard-column">
                  <h1 className="column-title" >Organizations</h1>
                  <OrganizationList state={this.props.state}/>                  
                </div>
                <div className="dashboard-column">
                  <h1 className="column-title" >Schedule</h1>
                  <h2 className="column-subtitle">Next Coolr Time</h2>
                    <NextCoolrContainer />
                  <h2 className="column-subtitle">Calendar</h2>
                  <div className="calendar-container">
                    <CalendarContainer />
                  </div>
                </div>

                <div className="dashboard-column">
                    <h1 className="column-title" >Trends</h1>
                    
                      <MostPopularContainer />
                    
              </div>
            </div>
          );
    }
      
}

export default Dashboard;