import { connect } from 'react-redux'
import React from 'react'
import { 
  queryMatch, 
  addCurrentCoolrs,
  removeCurrentCoolrs,
  pauseCounter,
  receiveRouted,
  addToNotified
 } from '../../actions/match_actions';
import { 
  applyUTCoffset, 
  happeningNow, 
  calcEndAndStartStrings 
} from '../../util/time_conversion_util';
import { openModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

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
    this.markOffCoolers = this.markOffCoolers.bind(this);
  }

  componentDidMount() {
    this.backgroundInterval = setInterval(this.interval, 1000)
    this.setState({
      localCoolrHoursStartAndEnd: this.usersCoolrTimesListLocal(this.props.user.orgs)
    })
  }

  markOffCoolers(coolrArr) {
    this.props.addToNotified(coolrArr);
    this.props.removeCurrentCoolrs(coolrArr);
  }

  usersCoolrTimesListLocal(orgs) {
    const localCoolrTimes = []
    if(orgs){orgs.forEach(org => {
      if (org.coolrHours.length > 0) {
        org.coolrHours.forEach(coolrHour => {
          const adjCoolrHour = applyUTCoffset(coolrHour)
          const startAndEnd = calcEndAndStartStrings(adjCoolrHour)
          localCoolrTimes.push([startAndEnd, org, {notified: false}])
        })
      }
    })}
    return localCoolrTimes
  }

  componentWillUnmount() {
    clearInterval(this.backgroundInterval)
  }

  interval() {
    if(!this.props.paused) {
      const localTime = new Date();
      this.checkForCoolrTimes(localTime, this.state.localCoolrHoursStartAndEnd)
    }
  }

  checkForCoolrTimes(localTime, coolrHours) {
    let addCoolrs = [];
    let removeCoolrs = [];
    coolrHours.forEach(coolrHour => {
      if(
        (!this.props.currentCoolrs.includes(coolrHour))
        &&
        (!this.props.notifiedOfCoolrs.includes(coolrHour))
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

  render() {

    if (this.props.currentCoolrs.length > 0) {
      this.props.pause();
      this.props.openModal();
    }

    if(this.props.matched.match && !this.props.matched.routed) {
      this.props.receiveRouted();
      this.props.history.push("/coolr")
    }

    if(this.props.history[0] === "/coolr") {
      this.props.pause()
    }
    return null
  }
}

const mSTP = state => ({
  user: state.session.user,
  currentCoolrs: state.ui.currentCoolrs,
  notifiedOfCoolrs: state.ui.notifiedOfCoolrs,
  paused: state.ui.paused,
  matched: state.entities.users
})

const mDTP = dispatch => ({
  queryMatch: userData => dispatch(queryMatch(userData)),
  addCurrentCoolrs: currentCoolrs => dispatch(addCurrentCoolrs(currentCoolrs)),
  removeCurrentCoolrs: currentCoolrs => dispatch(removeCurrentCoolrs(currentCoolrs)),
  openModal: () => dispatch(openModal('pairMatch')),
  pause: () => dispatch(pauseCounter()),
  receiveRouted: () => dispatch(receiveRouted()),
  addToNotified: (coolrHours) => dispatch(addToNotified(coolrHours))
})

export default connect(mSTP, mDTP)(withRouter(CoolrTimeWatcher));