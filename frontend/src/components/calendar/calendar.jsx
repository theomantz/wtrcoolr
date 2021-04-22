import React from 'react';
import CalendarDay from './calendar_day'
import './calendar.scss'


class Calendar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            orgs: this.props.orgs,
            days: [ 0, 1, 2, 3, 4, 5, 6 ]
        }
    }

    days() {
        return (
            [
                0,
                1,
                2,
                3,
                4,
                5,
                6
            ]
        )
    }

    render() {
        // console.log(this.state.orgs)
        return (
            <div className="calendar-container">
                <div className="week-header">
                    <span>WEEKGOESHERE</span>
                </div>
                <div className="calendar-header">
                    <span>Date</span>
                    <span>Time</span>
                    <span>Org.</span>
                </div>
                <div className="days-container">
                    {this.state.days.map(day => {
                        return <CalendarDay 
                            day={day} orgs={this.state.orgs} 
                            key={`calendarday-${day}`}
                        />
                    })}
                </div>
            </div>
        )
    }
}

export default Calendar;

