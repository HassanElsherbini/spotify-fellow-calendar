
const getDateDetails = (dateStr) => {
  let date = new Date(dateStr);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hour: date.getHours()
  };
};

export const getFirstDayOfMonth = (month, year) => {
  year = year ? year : year = new Date().getFullYear();
  return new Date(year, month, 1).getDay();
};

export const getEndOfMonth = (month, year) => {
  year = year ? year : year = new Date().getFullYear();
  return new Date(year, month + 1, 0).getDate();
};

export const groupEventsByTime = (events) => {
  //ex. 2018, 5, 24, 7 am
  //  { 20185: {24: {7: [events...]} } }
  let eventA, eventB;
  events.sort((a, b) => {
    eventA = new Date(a.startDate);
    eventB = new Date(b.startDate);
    return eventA.getTime() - eventB.getTime();
  });

  let yymm = '';
  let dd = '';
  let hh = '';
  let eventDate;

  return events.reduce((groupedEvents, event) => {
    eventDate = getDateDetails(event.startDate);
    yymm = `${eventDate.year}${eventDate.month}`;
    dd = eventDate.day;
    hh = eventDate.hour;
    if (groupedEvents[yymm]){
      if (groupedEvents[yymm][dd]){
        (groupedEvents[yymm][dd][hh])
          ? groupedEvents[yymm][dd][hh].push(event)
          : groupedEvents[yymm][dd][hh] = [event];
      }
      else groupedEvents[yymm][dd] = { [hh]: [event] };
    }
    else groupedEvents[yymm] = {[dd]: {[hh]: [event]} };

    return groupedEvents;
  }, {});

};

export const getEventList = (hours) => {
  //get events for hours 0-23
  let events = [];
  for (let i = 0; i < 24; i++) {
    if (hours[i]) events.push(...hours[i]);
  }

  return events;
};

export const formatTime = (time) => {
  time = new Date(time);
  let hh = time.getHours();
  let mm = time.getMinutes();
  mm = mm < 10 ? `0${mm}` : mm;
  let suffix = hh > 11 ? 'pm' : 'am';
  if (hh === 0 ) hh = '12';
  else if (hh > 12) hh = hh % 12;

  return `${hh}:${mm}${suffix}`;
};

export const getTimeValues = (timeStr) => {
  let timeValues = timeStr.split(':');
  timeValues[0] = Number(timeValues[0]);
  timeValues[1] = Number(timeValues[1]);

  return timeValues;
};
