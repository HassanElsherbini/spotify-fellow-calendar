import React from 'react';
import CalendarHeader from '../components/CalendarHeader';

const CalendarByMonth = (props) => {
  let { days } = props;
  return (
    <div id="calendar">
      <CalendarHeader />
      <div className="calendar-days">
       {days}
      </div>
    </div>
  );
};

export default CalendarByMonth;
