export const fixToStr = (num) => {
  if (num < 10) {
    return "0" + num.toString()
  } else {
    return num.toString()
  }
}

export const applyUTCoffset = (str) => {

  const localTime = new Date();
  const offset = localTime.getTimezoneOffset();
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

  const finalHours = fixToStr(adjHours)
  const finalMins = fixToStr(adjMins)

  const adjStr = `${adjDay}${finalHours}${finalMins}${str.slice(5)}`
  return adjStr
}

export const happeningNow = (startStr, endStr, currentLocalDate) => {
  const currentLocalDay = currentLocalDate.getDay();
  const currentLocalMins = currentLocalDate.getMinutes();
  const currentLocalHours = currentLocalDate.getHours();

  const localMinsStr = fixToStr(currentLocalMins);
  const localHoursStr = fixToStr(currentLocalHours);

  const currentLocalStr = `${currentLocalDay}${localHoursStr}${localMinsStr}`
  const localTimeNum = parseInt(currentLocalStr)
  const startNum = parseInt(startStr)
  const endNum = parseInt(endStr)

  return (localTimeNum > startNum && localTimeNum < endNum)
}

export const calcEndAndStartStrings = localCoolrHour => {

  const startDay = parseInt(localCoolrHour.slice(0, 1));
  const startHours = parseInt(localCoolrHour.slice(1, 3));
  const startMins = parseInt(localCoolrHour.slice(3, 5));

  const lengthHours = parseInt(localCoolrHour.slice(5, 7));
  const lengthMins = parseInt(localCoolrHour.slice(7, 9));

  let endDayNum = startDay
  let endMinsNum = startMins + lengthMins;
  let endHoursNum = startHours + lengthHours;
  if (endMinsNum > 59) {
    endHoursNum += Math.floor(endMinsNum / 60)
    endMinsNum = endMinsNum % 60
  }
  if (endHoursNum > 23) {
    endDayNum += Math.floor(endHoursNum / 24)
    endHoursNum = endHoursNum % 24
  }
  endDayNum = endDayNum % 6

  let endMinsStr = fixToStr(endMinsNum)
  let endHoursStr = fixToStr(endHoursNum)

  const endStr = `${endDayNum.toString()}${endHoursStr}${endMinsStr}`
  const startStr = localCoolrHour.slice(0, 5)
  return ({ startStr, endStr })
}