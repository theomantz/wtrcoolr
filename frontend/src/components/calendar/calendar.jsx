import React from 'react';
import CalendarDay from './calendar_day'
import './calendar.scss'


class Calendar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
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
        return (
            <div className="calendar-container">
                <div className="week-header">
                    <span>4/18/21 -- 4/24/21</span>
                </div>
                <div className="calendar-header">
                    <span>Date</span>
                    <span>Start Time</span>
                    <span>Org.</span>
                </div>
                <div className="days-container">
                    {this.state.days.map(day => {
                        return <CalendarDay 
                            day={day} orgs={this.props.orgs} 
                            key={`calendarday-${day}`}
                            tcUtil={this.props.TCUtil}
                        />
                    })}
                </div>
            </div>
        )
    }
}

export default Calendar;

