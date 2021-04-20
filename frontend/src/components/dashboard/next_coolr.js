import React from 'react';
import './schedule.css'


class NextCoolr extends React.Component {
    constructor(props) {
        super(props);
        let d = [4,'1600','0045']
        this.state = {
            organization: 'App Academy Alumni',
            day: d[0],
            time: d[1],
            duration: d[2]
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


        let hours = parseInt(this.state.time)
        hours = (hours/100)%12
        if(hours===0){
            hours = 12;
        }
        let mins = parseInt(this.state.time)%100
        if(mins<10){
            mins = '0'+mins
        }
        let ampm = ''
        if(parseInt(this.state.time)/100/12<1){
            ampm = 'AM'
        }
        else{
            ampm = 'PM'
        }

        let timeNow = new Date();
        let targetDate = new Date();
        let datefound = false;
        while(!datefound){
            if(timeNow.getDay()===this.state.day){
                if(   timeNow.getHours()<=(parseInt(this.state.time))/100     &&  timeNow.getMinutes()< (parseInt(this.state.time))%100  ){
                    datefound = true;
                }
            }
            targetDate.setDate(targetDate.getDate() + 1);
            console.log(targetDate.getDay());
            if(targetDate.getDay()===this.state.day){
                datefound = true;
            }
        }
        return days[this.state.day]+", "+months[targetDate.getMonth()]+" "+targetDate.getDate()+"\n"+hours+":"+mins+" "+ampm
    }

    // timeText(){

    //     let hours = ParseInt(this.state.time)
    //     hours = (hours/100)%12
    //     if(hours===0){
    //         hours = 12;
    //     }
    //     let mins = ParseInt(this.state.time)%100
    //     if(mins<10){
    //         mins = '0'+mins
    //     }
    //     let ampm = ''
    //     if(this.state.date.getHours()/12<1){
    //         ampm = 'AM'
    //     }
    //     else{
    //         ampm = 'PM'
    //     }
    //     return hours+":"+mins+" "+ampm


    // }





    render() {

          return (
            <div className="next-coolr-container">
                <h1>{this.state.organization}</h1>
                <h2>{this.dateText()}</h2>
            </div>
          );
    }
      
}

export default NextCoolr;