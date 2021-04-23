import React from 'react'
import CoolrTimeWatcher from './coolr_time_watcher'

const CoolrTimeWatcherWrapper = props => {
  if (props.loggedIn) {
    return (
      <CoolrTimeWatcher />
    )
  } else {
    return null
  }
}

export default CoolrTimeWatcherWrapper;