import React from 'react';

const CoolrTime = props => {


  const time = this.props.time

  const standardTime = (time) => {
    let amOrpm;
    (time[1] * 10) > 11 ? amOrpm = 'AM' : amOrpm = 'PM'
    return (`${(time[1] * 10 + time[2]) % 12}:${(time[1] * 10 + time[2]) % 12} ${amOrpm}`)
  }
  const militaryTime = `${time[1]}${time[2]}:${time[2]}${time[4]}`

  return (
    <li>
      {militaryTime}
    </li>
  )
  
}

export default CoolrTime;