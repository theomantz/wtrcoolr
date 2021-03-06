import React from 'react';
import CoolrHour from './coolr_hour';
import { v4 as uuid } from 'uuid'
import { applyUTCoffset } from '../../util/time_conversion_util';

class CalendarDay extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
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

  todaysCoolrTimesList() {
    const todaysTimes = []

    this.props.orgs.forEach(org => {
      if(org.coolrHours.length > 0) {
        org.coolrHours.map(coolrHour => {
          const daysWords = {
            'Sunday': 0, 
            'Monday': 1, 
            'Tuesday': 2, 
            'Wednesday': 3, 
            'Thursday': 4, 
            'Friday': 5, 
            'Saturday': 6
          }
          const adjCoolrHour = applyUTCoffset(coolrHour)
          if (JSON.parse(adjCoolrHour[0]) === JSON.parse(this.props.day)) {
            todaysTimes.push([adjCoolrHour, org.name])
          }
        })
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
    return todaysTimes.sort(sortTimes)
  }

  render() {
    
    return (
      <div className="calendar-day-container">
        <div className="day">{this.state.today}</div>

        <div className="calendar-day-content">
          <ul className="coolr-hour-list">
            {this.todaysCoolrTimesList().map(coolrHour => {
              return <CoolrHour key={uuid()}coolrHour={coolrHour[0]} />
            })}
          </ul>
          <ul className="org-name-list">
            {this.todaysCoolrTimesList().map(arr => {
              return <li key={uuid()}>{arr[1]}</li>
            })}
          </ul>
        </div>  
      </div>
    )
  }
}

export default CalendarDay;