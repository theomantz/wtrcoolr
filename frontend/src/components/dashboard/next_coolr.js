import React from 'react';
import './schedule.css'


class NextCoolr extends React.Component {
    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            organization: 'App Academy Alumni',
            date: d
        }
    }
    
    componentWillMount() {
    }

    componentWillReceiveProps(newState) {
      //  this.setState({ tweets: newState.tweets });
    }   
    
    dateText(){
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        return days[this.state.date.getDay()]+", "+months[this.state.date.getMonth()]+" "+this.state.date.getDate()
    }

    timeText(){

        let hours = this.state.date.getHours()%12
        if(hours===0){
            hours = 12;
        }
        let mins = this.state.date.getMinutes()
        if(mins<10){
            mins = '0'+mins
        }
        let ampm = ''
        if(this.state.date.getHours()/12<1){
            ampm = 'AM'
        }
        else{
            ampm = 'PM'
        }
        return hours+":"+mins+" "+ampm


    }





    render() {

          return (
            <div className="next-coolr-container">
                <h1>{this.state.organization}</h1>
                <h2>{this.dateText()}</h2>
                <h3>{this.timeText()}</h3>
            </div>
          );
    }
      
}

export default NextCoolr;