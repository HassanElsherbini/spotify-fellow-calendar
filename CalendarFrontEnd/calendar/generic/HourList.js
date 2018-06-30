import React from 'react';

import Hour from './Hour';


const HourList = ({day, selectedView}) => {
  let hours = [];
  let hour;
  let hourEvents = [];

  for (let i = 0; i < 24; i++) {
    hourEvents = day.events[i] ? day.events[i] : [];
    hour = (<Hour key={i} events={hourEvents} day={day} hourNum={i} selectedView={selectedView} />);
    hours.push(hour);
  }

  return hours;
};

export default HourList;
