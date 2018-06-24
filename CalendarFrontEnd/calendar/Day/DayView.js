import React from 'react';

import CalendarHeader from '../generic/CalendarHeader';
import HourLabels from '../generic/HourLabels';
import SingleDay from '../generic/SingleDay';
import {WEEK_DAYS} from '../../utility/constants';

const DayView = ({day}) => {
  let hours = [];
  for (let i = 1; i < 24; i++) hours.push(<div className="hour"> </div>);

  let dayOfWeek = day.getDay();
  let dayName = day.getDate();
  let dayLabels = [
    <div key={WEEK_DAYS[dayOfWeek]}className="daylabel">
      <div> {WEEK_DAYS[dayOfWeek]} </div>
      <div>{dayName}</div>
    </div>
  ];

  return (
    <div className="calendar-multiday">
      <div className="view-header">
          <CalendarHeader styletag="daylabels gap-left" view={2} dayLabels={dayLabels} />
      </div>
      <div className="multiday-dayscontainer">
        <HourLabels />
        <div className="dayview-daycontainer">
          <SingleDay view={2} hours={hours} />
        </div>
      </div>
    </div>
  );
};

export default DayView;
