import React from 'react';

const CoolrHour = props => {


  const time = props.coolrHour

  const standardTime = (time) => {
    let amOrpm;
    (time[1] * 10) > 11 ? amOrpm = 'AM' : amOrpm = 'PM'
    return (`${(parseInt(time[1]) * 10 + parseInt(time[2])) % 12}:${(parseInt(time[1]) * 10 + parseInt(time[2])) % 12} ${amOrpm}`)
  }

  const standTime = standardTime(time);
  const militaryTime = `${time[1]}${time[2]}:${time[2]}${time[4]}`


  console.log(typeof props.coolrHour[1])
  return (
    <li>
      {standTime}
    </li>
  )
  
}

export default CoolrHour;