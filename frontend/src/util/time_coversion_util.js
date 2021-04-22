const fromStringToUTCDate = (dbString) => {
  const yearNow = new Date().getFullYear();
  const monthNow = new Date().getMonth();
  const dateNow = new Date().getDate();
  const dayNow = new Date().getDay();
  const dbHours = dbString[1] * 10 + dbString[2] 
  const dbMins = dbString[3] * 10 + dbString[4] 


  const dbDay = dbString[0]

  const difference = dbDay - dateNow
  const newDate = dateNow + difference

  const thirtyOne = [0, 2, 4, 6, 7, 9, 11]
  const twentyNine = [1]
  const thirty = [3, 5, 8, 10]

  let newMonth;
  let newYear;
  if(thirtyOne.includes(monthNow)) {
    if(newDate > 30) {
      newMonth = monthNow + 1
    } else if (newDate < 0) {
      newMonth = monthNow - 1
    } else {
      newMonth
    }
  } else if(monthNow === 1) {
    if (newDate > 28) {
      newMonth = monthNow + 1
    } else if (newDate < 0) {
      newMonth = monthNow - 1
    } else {
      newMonth
    }
  } else {
    if (newDate > 29) {
      newMonth = monthNow + 1
    } else if (newDate < 0) {
      newMonth = monthNow - 1
    } else {
      newMonth
    }
  };

  if (newMonth > 11) {
    newYear = yearNow + 1
  } else if (newMonth < 0) {
    newYear = yearNow - 1
  } else {
    newYear = yearNow
  }

  return new Date(newYear, newMonth, newDate, dbHours, dbMins)
}



const getLocalTimeString = (utcdate) => {
  const fullStr = utcdate.toLocaleTimeString('en-US');
  let fullStrArr = fullStr.split(':');
  let letters = fullStrArr[2].split(' ')[1]
  let shortStr = [fullStrArr[0], fullStrArr[1]].join(":");
  let result = [shortStr, letters].join(" ");
  return result
}

const getLocalDayofWeek = utcdate => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fullStr = utcdate.toLocaleTimeString(undefined, options);
  return fullStr.split(" ")[0]
}

const fromUTCDateToString = (utcdate) => {
  
}