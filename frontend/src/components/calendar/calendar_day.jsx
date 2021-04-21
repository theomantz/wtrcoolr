import React from 'react';
import CoolrTime from './coolr_time';

class CalendarDay extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      sortedCoolrTimes: []
    }

    this.todayCoolrTimesList = this.todayCoolrTimesList.bind(this)
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
      org.coolrTimes.forEach(coolrTime => {
        if(JSON.parse(coolrTime[0]) === JSON.parse(this.props.day)) {
          todaysTimes.push([coolrTime, org.name])
        }
      })
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
      <div className={`calendar-${this.todayInWords()}`}>
        <div>{this.props.day}</div>

        <div>
          <ul>
            {this.state.sortedCoolrTimes.map(arr => {
              <CoolrTime time={arr[0]} />
            })}
          </ul>
          <ul>
            {this.state.sortedCoolrTimes.map(arr => {
              <li>
                {arr[1]}
              </li>
            })}
          </ul>
        </div>  
      </div>
    )
  }
}

export default CalendarDay;