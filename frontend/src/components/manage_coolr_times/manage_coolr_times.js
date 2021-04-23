import React from 'react';
import applyUTCoffset from '../../util/time_conversion_util';
import reverseUTCoffset from '../../util/reverse_time_conversion_util';
import './manage_coolr_times.css'
import {editOrg} from '../../util/orgs_api_util'



class ManageCoolrTimes extends React.Component {
    constructor(props) {
        super(props);

        

        this.state={
            coolrTimes: [],
            day: '0',
            duration: '0060',
            time: '09:00'
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.listTimes = this.listTimes.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        

        

    } //constructor

    componentDidMount(){
        if(this.props.org.coolrHours){
        this.listTimes()
        }
    }

    listTimes(){
        let adjCoolrTimes = []
        this.props.org.coolrHours.forEach(coolrHour =>{
            let adjHour = applyUTCoffset(coolrHour);
            let day = [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
              ][parseInt(adjHour.slice(0,1))]


            let hours = parseInt(adjHour.slice(1,5))
            hours = (hours/100)%12
            if(hours===0){
                hours = 12;
            }
            let mins = parseInt(adjHour.slice(1,5))%100
            if(mins<10){
                mins = '0'+mins
            }
            let ampm = ''
            if(parseInt(adjHour.slice(1,5))/100/12<1){
                ampm = 'AM'
            }
            else{
                ampm = 'PM'
            }

            let time = parseInt(hours)+":"+mins+" "+ampm

            hours = parseInt(adjHour.slice(5,9))
            hours = (hours/100)%12
            if(hours===0){
                hours = 12;
            }
            mins = parseInt(adjHour.slice(5,9))%100
            if(mins<10){
                mins = '0'+mins
            }

            let duration = ''
            if(hours>1){
                duration = parseInt(hours)
                hours>=2? duration += "hours " : duration += "hour "
            }
            duration += mins + " minutes"
            adjCoolrTimes.push([day,time,duration])
        })
        this.setState({'coolrTimes': adjCoolrTimes})
    }



    update(field) {
        return (
          e => {
            this.setState({[field]: e.currentTarget.value})
          }
        )
      }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        
        let coolrString = 
            this.state.day
            +this.state.time.slice(0,2)
            +this.state.time.slice(3,5)
            +this.state.duration

        coolrString = reverseUTCoffset(coolrString)
        let newCoolrHours = []
        newCoolrHours = this.props.org.coolrHours.slice(0,this.props.org.coolrHours.length)
        newCoolrHours.push(coolrString)
        editOrg({
            coolrHours: newCoolrHours,
            id: this.props.org._id
          })
          .then((org) => {
            let orgsArr = this.props.currentUser.orgs.slice(0,this.props.currentUser.orgs.length)
            
            for(let i =0;i<orgsArr.length;i++){
                if(orgsArr[i]._id===org.data._id){
                    orgsArr[i].coolrHours.push(coolrString)
                }
            }
            this.props.getPublicOrgs();
            this.props.updateUser({
              orgs: orgsArr,
              id: this.props.currentUser.id
            })
            this.listTimes();
            //this.props.history.push({pathname: `/admin/${org.id}`}) //change to org page
            })
          .catch(() => {})
      }

      handleRemove(index) {
          
        return (
          e => {
            e.preventDefault();
            let newCoolrHours = []
            newCoolrHours = this.props.org.coolrHours.slice(0,index).concat(this.props.org.coolrHours.slice(index+1,this.props.org.coolrHours.length))
            editOrg({
                coolrHours: newCoolrHours,
                id: this.props.org._id
            })
            .then((org) => {
                let orgsArr = this.props.currentUser.orgs.slice(0,this.props.currentUser.orgs.length)
                
                for(let i =0;i<orgsArr.length;i++){
                    if(orgsArr[i]._id===org.data._id){
                        orgsArr[i].coolrHours.splice(index,1)
                    }
                }
                this.props.getPublicOrgs();
                this.props.updateUser({
                orgs: orgsArr,
                id: this.props.currentUser.id
                })
                this.listTimes();
                //this.props.history.push({pathname: `/admin/${org.id}`}) //change to org page
                })
            .catch(() => {})
            }
        )
      }
    
    
    render() {

          return (
            <div className = "manage-coolr-time-container">
                <div className="add-coolr-time-container">
                    <form 
                        onSubmit={this.handleSubmit}
                        className="add-coolr-time-form">
                        <div className="coolr-inputs">
                        <input onChange={this.update('time')} type="time" value={this.state.time} id="time" />
                        <select onChange={this.update('day')}>
                            <option value="0">Sunday</option>
                            <option value="1">Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                            <option value="6">Saturday</option>
                        </select>
                        <select onChange={this.update('duration')}>
                            <option value="0100">One hour</option>
                            <option value="0030">30 minutes</option>
                            <option value="0015">15 minutes</option>
                            <option value="0005">5 minutes</option>
                        </select>
                        </div>
                        <input 
                            type="submit" 
                            value="Add Coolr Time"
                        />
                    </form>
                </div>





                <ul className="coolr-time-list">
                    <h2 className="column-subtitle">Current Coolr Times</h2>
                    {this.state.coolrTimes.map((coolrTime,index) => (
                        <li className = "coolr-row">
                            <div className="coolr-listing">
                                <strong className="coolr-time-info">{coolrTime[0]}</strong>
                                <strong className="coolr-time-info">{coolrTime[1]}</strong>
                                <strong className="coolr-time-info">{coolrTime[2]}</strong>
                            </div>
                            <button onClick={this.handleRemove(index)} className="remove-coolr">Remove</button>
                        </li>))
                    }
                </ul>
            </div>
          );
    }
      
}

export default ManageCoolrTimes;