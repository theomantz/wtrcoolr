import React from 'react';

const CoolrHour = props => {


  const time = props.coolrHour

  const standardTime = (time) => {
    let amOrpm;
    let first = parseInt(time[1]) * 10 + parseInt(time[2])

    first > 11 ? amOrpm = 'PM' : amOrpm = 'AM'
    let firstHalf = (str1, str2) => {
      let num = parseInt(str1 + str2) % 12
      if (num === 0) {
        num = 12;
      }
      if(num < 10) {
        return "0" + num.toString()
      } else {
        return num.toString()
      }
    }
    const hours = firstHalf(time[1], time[2]) 
    return (`${hours}:${time[3] + time[4]} ${amOrpm}`)
  }

  const standTime = standardTime(time);
  const militaryTime = `${time[1]}${time[2]}:${time[3]}${time[4]}`


  // console.log(typeof props.coolrHour[1])
  return (
    <li>
      {standTime}
    </li>
  )
  
}

export default CoolrHour;