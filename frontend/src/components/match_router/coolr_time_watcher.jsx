import { connect } from 'react-redux'
import React from 'react'
import { 
  addCurrentCoolrs,
  removeCurrentCoolrs,
  pauseCounter,
  receiveRouted,
  addToNotified,
  removeNotifiedCoolrs,
  clearCurrentCoolrs,
  clearNotifiedCoolrs
 } from '../../actions/match_actions';
import { 
  applyUTCoffset, 
  happeningNow, 
  calcEndAndStartStrings 
} from '../../util/time_conversion_util';
import { openModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import './coolr_time_watcher.scss'

class CoolrTimeWatcher extends React.Component {

  constructor(props) {
    super(props) 
    this.interval = this.interval.bind(this);
    this.usersCoolrTimesListLocal = this.usersCoolrTimesListLocal.bind(this);
    this.checkForCoolrTimes = this.checkForCoolrTimes.bind(this);
  }

  componentDidMount() {
    this.backgroundInterval = setInterval(this.interval, 1000)
  }

  usersCoolrTimesListLocal(orgs) {
    const localCoolrTimes = []
    if(orgs){orgs.forEach(org => {
      if (org.coolrHours.length > 0 && org) {
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
    clearInterval(this.backgroundInterval);
    this.props.clearCurrentCoolrs();
    this.props.clearNotifiedCoolrs();
  }

  interval() {
    if(!this.props.paused) {
      const localTime = new Date();
      const localCoolrTimes = this.usersCoolrTimesListLocal(this.props.user.orgs)
      this.checkForCoolrTimes(localTime, localCoolrTimes)
    }
  }

  checkForCoolrTimes(localTime, coolrHours) {
    let addCoolrs = [];
    let removeCoolrs = [];
    let removeNotified = [];
    let listOfCurrentCoolrStrings = this.props.currentCoolrs.map(
      clr => JSON.stringify(clr)
    )
    let listOfNotifiedCoolrStrings = this.props.notifiedOfCoolrs.map(
      clr => JSON.stringify(clr)
    )
    coolrHours.forEach(coolrHour => {
      let stringified = JSON.stringify(coolrHour)
      if(
        (!listOfCurrentCoolrStrings.includes(stringified))
        &&
        (!listOfNotifiedCoolrStrings.includes(stringified))
        &&
        happeningNow(coolrHour[0].startStr, coolrHour[0].endStr, localTime)
      ) {
        addCoolrs.push(coolrHour);
      } else if (
        listOfCurrentCoolrStrings.includes(stringified)
        &&
        (!happeningNow(coolrHour[0].startStr, coolrHour[0].endStr, localTime))
      ) {
        removeCoolrs.push(coolrHour);
      } else if (
        listOfNotifiedCoolrStrings.includes(stringified)
        &&
        (!happeningNow(coolrHour[0].startStr, coolrHour[0].endStr, localTime))
      ) {
        removeNotified.push(coolrHour);
      }
    });
    if (addCoolrs.length > 0) {
      this.props.addCurrentCoolrs(addCoolrs)
    }
    if (removeCoolrs.length > 0) {
      this.props.removeCurrentCoolrs(removeCoolrs)
    }
    if (removeNotified.length > 0) {
      this.props.removeNotifiedCoolrs(removeNotified)
    }
  }

  render() {
    
    if(this.props.matched.match && !this.props.matched.routed) {
      this.props.receiveRouted();
      this.props.history.push("/coolr")
    }
    if (this.props.currentCoolrs.length > 0) { this.props.openModal() }
    if(this.props.history.location.pathname === "/coolr") { this.props.pause() }
    
    if(this.props.waiting) {
      return (
        <div className="waiting-for-another">
          Waiting for another member
        </div>
      )
    } else {
      return null
    }
  }
}

const mSTP = state => ({
  user: state.session.user,
  currentCoolrs: state.ui.currentCoolrs,
  notifiedOfCoolrs: state.ui.notifiedOfCoolrs,
  paused: state.ui.paused,
  matched: state.entities.users,
  waiting: state.ui.waiting
})

const mDTP = dispatch => ({
  addCurrentCoolrs: currentCoolrs => dispatch(addCurrentCoolrs(currentCoolrs)),
  removeCurrentCoolrs: currentCoolrs => dispatch(removeCurrentCoolrs(currentCoolrs)),
  openModal: () => dispatch(openModal('pairMatch')),
  pause: () => dispatch(pauseCounter()),
  receiveRouted: () => dispatch(receiveRouted()),
  addToNotified: (coolrHours) => dispatch(addToNotified(coolrHours)),
  removeNotifiedCoolrs: (coolrHours) => dispatch(removeNotifiedCoolrs(coolrHours)),
  clearCurrentCoolrs: () => dispatch(clearCurrentCoolrs()),
  clearNotifiedCoolrs: () => dispatch(clearNotifiedCoolrs())
 })

export default withRouter(connect(mSTP, mDTP)(CoolrTimeWatcher));