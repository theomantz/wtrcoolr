import React from 'react';
import CalendarDay from './calendar_day'


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
                {this.state.days.map(day => {
                    <CalendarDay day={day} orgs={this.state.orgs} />
                })}
            </div>
        )
    }
}

export default Calendar;

