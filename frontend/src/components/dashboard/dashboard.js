import React from 'react';
import './dashboard.css'
import NextCoolrContainer from './next_coolr_container'
import MostPopularContainer from './most_popular_container'
import CalendarContainer from '../calendar/calendar_container'
import OrganizationListContainer from '../dashboard/organization_list_container';


class Dashboard extends React.Component {
    
    componentDidMount() {
      this.props.getPublicOrgs();
      this.props.fetchUser();
    }
    
    render() {
          return (
            <div className="dashboard-container">
                <div className="dashboard-column">
                  <h1 className="column-title" >Organizations</h1>
                  <OrganizationListContainer/>                  
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