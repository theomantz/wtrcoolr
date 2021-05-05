const reverseUTC = (str) => {

    const localTime = new Date();
    const offset = -1*localTime.getTimezoneOffset();
    const offsetHours = offset / 60;
    const offsetMins = offset % 60;
    const strHours = parseInt(str[1] + str[2]);
    const strMins = parseInt(str[3] + str[4]);
    let adjHours = strHours - offsetHours;
    let adjMins = strMins - offsetMins;
    let adjDay = parseInt(str[0]);
  
    if (adjMins > 59) {
      adjMins = adjMins % 60;
      adjHours += 1;
    } else if (adjMins < 0) {
      adjMins = 60 - (Math.abs(adjMins));
      adjHours -= 1;
    }
  
    if (adjHours > 23) {
      adjHours = adjHours % 24;
      adjDay += 1;
    } else if (adjHours < 0) {
      adjHours = 24 - (Math.abs(adjHours));
      adjDay -= 1;
    }
  
    if (adjDay < 0) {
      adjDay = 7 - (Math.abs(adjDay));
    }
  
  
    const fixToStr = (num) => {
      if (num < 10) {
        return "0" + num.toString()
      } else {
        return num.toString()
      }
    }
    const finalHours = fixToStr(adjHours)
    const finalMins = fixToStr(adjMins)
  
    const adjStr = `${adjDay}${finalHours}${finalMins}${str.slice(5)}`
    return adjStr
  }

  export default reverseUTC;