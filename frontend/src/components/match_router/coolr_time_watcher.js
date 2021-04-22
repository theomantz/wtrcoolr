import { connect } from 'react-redux'
import React from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import { queryMatch } from '../../actions/match_actions';
import { applyUTCoffset, happeningNow,  } from '../../util/time_util';

class CoolrTimeWatcher extends React.Component {

  constructor(props) {
    super(props) 

    this.state = {
      localTime: new Date(),
      localCoolrHoursStartAndEnd: usersCoolrTimesListLocal(this.user.props.orgs)
    }

    this.interval = this.interval.bind(this);
    this.usersCoolrTimesListLocal = this.usersCoolrTimesListLocal.bind(this)
  }

  componentDidMount() {
    this.backgroundInterval = setInterval(this.interval, 60000)

  }

  usersCoolrTimesListLocal(orgs) {
    const localTimes = []
    orgs.forEach(org => {
      if (org.coolrHours.length > 0) {
        org.coolrHours.forEach(coolrHour => {
          const adjCoolrHour = applyUTCoffset(coolrHour)
          const startAndEnd = calcEndAndStartStrings(adjCoolrHour)
          todaysTimes.push([startAndEnd, org.name])
        })
      }
    })
    return localTimes
  }

  componentWillUnmount() {
    clearInterval(this.backgroundInterval)
  }

  interval() {
    const localTime = new Date();
    this.checkForCoolrTimes(localTime, this.state.usersCoolrTimesListLocal)
  }

  checkForCoolrTimes(localTime, coolrHours) {
    let currentCoolrs = []
    coolrHours.forEach(coolrHour => {
      if(happeningNow(coolrHour[0].startStr, coolrHour[0].endStr)) {
        currentCoolrs.push(coolrHour)
      }
    })
  }
  //Set clock for session
  //Set variables for users orgs+coolerHours adjusted for local time
  //Clock runs + if its value enters coolrHours then it sends `props.queryMatch`

  //In result check to see if match !== {}, and then open modal with match modal

  //Clear clock for session

  //build match modal that alerts user to a current coolrHour, asks them to generate match,
  //If match is generated

  render() {
    // if()
    return null
  }

}

const mSTP = state => {
  user = state.session.user,
  match = state.session.match
}

const mDTP = dispatch => {
  queryMatch: userData => dispatch(queryMatch(userData))
}

export default connect(mSTP, mDTP)(CoolerTimeWatcher);