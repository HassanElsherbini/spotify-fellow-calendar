import React from 'react';

import SingleDay from '../generic/SingleDay';
import HourLabels from '../generic/HourLabels';
import CalendarHeader from '../generic/CalendarHeader';
import {WEEK_DAYS} from '../../utility/constants';

const WeekView = ({days}) => {
  let dayLabels = WEEK_DAYS.map((name, indx) => {
    let dayNum = days[indx].getDate();
    return (
      <div key={name} className="daylabel">
        <div>{name}</div>
        <div>{dayNum}</div>
      </div>
    );
  });

  let hours = [];
  let dayList = [];
  for (let i = 1; i < 24; i++) hours.push(<div key={i}className="hour"> </div>);

  for (let i = 0; i < 7; i++) dayList.push(<SingleDay key={i} view={1} hours={hours} />);

  return (
    <div className="calendar-multiday">
      <div className="view-header">
          <CalendarHeader styletag="daylabels gap-left" dayLabels={dayLabels} />
      </div>
      <div className="multiday-dayscontainer">
        <HourLabels />
        <div className="weekview-days">
          {dayList}
        </div>
      </div>
    </div>

  );
};

export default WeekView;
