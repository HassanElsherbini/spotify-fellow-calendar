import React from 'react';

const CalendarHeader = ({view = 0, dayOfWeek = 0, styletag, dayLabels}) => {

  return (
    <div className={styletag}> {dayLabels} </div>
  );
};

export default CalendarHeader;
