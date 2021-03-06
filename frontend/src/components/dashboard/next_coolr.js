import React from 'react';
import './schedule.css'
import { applyUTCoffset } from '../../util/time_conversion_util';


class NextCoolr extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            organization: "",
            day: "1",
            time: "0900",
            duration: "0100",
            populated: false
        }
        if(this.props.orgs){
                    this.todaysCoolrTimesList = this.todaysCoolrTimesList.bind(this)
                    let tempArray = this.todaysCoolrTimesList()


                    if(tempArray.length>0){

                    let timesArray = tempArray.map(info => [info[0].slice(0,1),info[0].slice(1,5),info[1]])
                    let earliestTime=[];
                    let timeNow = new Date();
                    let time = [];
                    for(let i=0;i<timesArray.length;i++){
                        time = timesArray[i]
                        if(time[0]>timeNow.getDay()){
                            earliestTime = time;
                            break;
                        }
                        else if(time[0]>=timeNow.getDay() && parseInt(time[1])/100 >timeNow.getHours()){
                            earliestTime = time;
                            break;
                        }
                        else if(time[0]>=timeNow.getDay() && parseInt(time[1])/100 >= timeNow.getHours() && parseInt(time[1])%100 > timeNow.getMinutes()){
                            earliestTime = time;
                            break;
                        }
                    }
                    if(earliestTime.length<1){
                        earliestTime = timesArray[0];
                    }

                    this.state = {
                        organization: earliestTime[2],
                        day: parseInt(earliestTime[0]),
                        time: earliestTime[1],
                        duration: earliestTime[2],
                        populated: true
                    }
                }
        }
    }
    
    todaysCoolrTimesList() {
        const todaysTimes = []
        this.props.orgs.forEach(org => {
          if(org.coolrHours.length > 0) {
            org.coolrHours.forEach(coolrHour => {
              const adjCoolrHour = applyUTCoffset(coolrHour)
                todaysTimes.push([adjCoolrHour, org.name])
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
            if(targetDate.getDay()===this.state.day){
                datefound = true;
            }
        }
        return days[this.state.day]+", "+months[targetDate.getMonth()]+" "+targetDate.getDate()+"\n"+parseInt(hours)+":"+mins+" "+ampm
    }






    render() {
        if(this.state.populated){
          return (
            <div className="next-coolr-container">
                <h1>{this.state.organization}</h1>
                <h2>{this.dateText()}</h2>
            </div>
          );
        }
        else{
            return(
                <div className="next-coolr-container">
                <h1>No Cooler Times</h1>
            </div>
            )
        }
    }
      
}

export default NextCoolr;