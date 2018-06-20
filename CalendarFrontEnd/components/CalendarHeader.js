import React from 'react';
import {WEEK_DAYS} from '../utility/constants';

const CalendarHeader = () => {
  return (
    <div className="calendar-header">
      {WEEK_DAYS.map(day => <div key={day}> {day}</div>)
      }
    </div>
  );
};

export default CalendarHeader;
