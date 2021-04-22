import React from 'react';
import './dashboard.css'
import OrganizationList from './organization_list'
import NextCoolr from './next_coolr'
import MostPopularContainer from './most_popular_container'
import CalendarContainer from '../calendar/calendar_container'



class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: []
        }
    }
    

    // getItems(){
    //   let userOrgs = props.state.session.user.orgs
    //   let itemArr = userOrgs.map(org => (
    //     {id: String(org._id), content: org.name}
    //   ))
    //   // return ([
    //   //     {id: '1', content: 'App Academy Alumni'},
    //   //     {id: '2', content: 'Bowling Group'},
    //   //     {id: '3', content: 'Google'},
    //   //     {id: '4', content: 'Church Group'},
    //   //     {id: '5', content: 'Avengers'},
    //   //     {id: '6', content: 'Joe\'s Circle'},
    //   //     {id: '7', content: 'Dubnation'},
    //   //     {id: '8', content: 'Thai Food Enthusiasts'},
    //   //     {id: '9', content: 'Cat People'},
    //   //     {id: '10', content: 'PTA Group'}
    //   // ])
    //   return itemArr;
    // }

    componentWillMount() {
      this.props.getPublicOrgs();
    }

    componentWillReceiveProps(newState) {
      //  this.setState({ tweets: newState.tweets });
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
                  <NextCoolr />
                  <h2 className="column-subtitle">Calendar</h2>
                  <div className="calendar-container">
                    {/* <CalendarContainer /> */}
                  </div>
                </div>

                <div className="dashboard-column">
                    <h1 className="column-title" >Trends</h1>
                    <h2 className="column-subtitle">Most Popular</h2>
                    <MostPopularContainer />
                    <h2 className="column-subtitle">Trending</h2>
              </div>
            </div>
          );
    }
      
}

export default Dashboard;