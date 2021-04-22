import React from 'react';
import CoolrHour from './coolr_hour';

class CalendarDay extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      sortedCoolrTimes: [],
      today: this.todayInWords() 
    }

    this.todaysCoolrTimesList = this.todaysCoolrTimesList.bind(this)
    this.todayInWords = this.todayInWords.bind(this)
  }

  todayInWords() {
    return (
      [
        'Sun.',
        'Mon.',
        'Tue.',
        'Wed.',
        'Thu.',
        'Fri.',
        'Sat.'
      ][this.props.day]
    )

  }

  componentDidMount() {
    this.setState({
      sortedCoolrTimes: this.todaysCoolrTimesList()
    })
  }

  todaysCoolrTimesList() {
    const todaysTimes = []
    this.props.orgs.forEach(org => {
      // console.log(org)
        if(JSON.parse(org.coolrHours[0]) === JSON.parse(this.props.day)) {
          todaysTimes.push([org.coolrHours, org.name])
        }
    })

    function sortTimes(a, b) {
        if (a[0] < b[0] ) {
          return -1;
        } else if (a[0] > b[0]) {
          return 1;
        } else {
          return 0;
      }
    }
    // console.log(todaysTimes.sort(sortTimes))
    return todaysTimes.sort(sortTimes)
  }

  render() {
    
    return (
      <div className="calendar-day-container">
        <div className="day">{this.state.today}</div>

        <div className="calendar-day-content">
          <ul className="coolr-hour-list">
            {this.state.sortedCoolrTimes.map(coolrHour => {
              return <CoolrHour coolrHour={coolrHour[0]} />
            })}
          </ul>
          <ul className="org-name-list">
            {this.state.sortedCoolrTimes.map(arr => {
              return <li>{arr[1]}</li>
            })}
          </ul>
        </div>  
      </div>
    )
  }
}

export default CalendarDay;