import { connect } from 'react-redux'
import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { 
  queryMatch, 
  addCurrentCoolrs,
  removeCurrentCoolrs
 } from '../../actions/match_actions';
import { 
  applyUTCoffset, 
  happeningNow, 
  calcEndAndStartStrings 
} from '../../util/time_util';

class CoolrTimeWatcher extends React.Component {

  constructor(props) {
    super(props) 

    this.state = {
      localTime: new Date(),
      localCoolrHoursStartAndEnd: []
    }

    this.interval = this.interval.bind(this);
    this.usersCoolrTimesListLocal = this.usersCoolrTimesListLocal.bind(this);
    this.checkForCoolrTimes = this.checkForCoolrTimes.bind(this);
  }

  componentDidMount() {
    this.backgroundInterval = setInterval(this.interval, 60000)
    this.setState({
      localCoolrHoursStartAndEnd: this.usersCoolrTimesListLocal(this.props.user.orgs)
    })
  }

  usersCoolrTimesListLocal(orgs) {
    const localCoolrTimes = []
    if(orgs){orgs.forEach(org => {
      if (org.coolrHours.length > 0) {
        org.coolrHours.forEach(coolrHour => {
          const adjCoolrHour = applyUTCoffset(coolrHour)
          const startAndEnd = calcEndAndStartStrings(adjCoolrHour)
          localCoolrTimes.push([startAndEnd, org.name])
        })
      }
    })}
    return localCoolrTimes
  }

  componentWillUnmount() {
    clearInterval(this.backgroundInterval)
  }

  interval() {
    const localTime = new Date();
    this.checkForCoolrTimes(localTime, this.state.localCoolrHoursStartAndEnd)
    console.log(localTime)
  }

  checkForCoolrTimes(localTime, coolrHours) {
    let addCoolrs = [];
    let removeCoolrs = [];
    coolrHours.forEach(coolrHour => {
      if(
        (!this.props.currentCoolrs.includes(coolrHour))
        &&
        happeningNow(coolrHour[0].startStr, coolrHour[0].endStr, localTime)
      ) {
        addCoolrs.push(coolrHour);
      } else if (
        this.props.currentCoolrs.includes(coolrHour)
        &&
        (!happeningNow(coolrHour[0].startStr, coolrHour[0].endStr, localTime))
      ) {
        removeCoolrs.push(coolrHour);
      }
    });
    if (addCoolrs.length > 0) {
      this.props.addCurrentCoolrs(addCoolrs)
    }
    if (removeCoolrs.length > 0) {
      this.props.removeCurrentCoolrs(removeCoolrs)
    }
  }
  //Set clock for session
  //Set variables for users orgs+coolerHours adjusted for local time
  //Clock runs + if its value enters coolrHours then it sends `props.queryMatch`

  //In result check to see if match !== {}, and then open modal with match modal

  //Clear clock for session

  //build match modal that alerts user to a current coolrHour, asks them to generate match,
  //If match is generated

  render() {
    return null
  }

}

const mSTP = state => ({
  user: state.session.user,
  currentCoolrs: state.ui.currentCoolrs
})

const mDTP = dispatch => ({
  queryMatch: userData => dispatch(queryMatch(userData)),
  addCurrentCoolrs: currentCoolrs => dispatch(addCurrentCoolrs(currentCoolrs)),
  removeCurrentCoolrs: currentCoolrs => dispatch(removeCurrentCoolrs(currentCoolrs))
})

export default connect(mSTP, mDTP)(CoolrTimeWatcher);