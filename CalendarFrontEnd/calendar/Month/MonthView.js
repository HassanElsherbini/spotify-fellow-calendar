import React from 'react';

import CalendarHeader from '../generic/CalendarHeader';
import {WEEK_DAYS} from '../../utility/constants';
import SingleDay from '../generic/SingleDay';

const MonthView = (props) => {
  let { days } = props;
  let dayList = days.map((day, idx) => <SingleDay key={idx} dayNum={day.getDate()} />);

  let dayLabels = WEEK_DAYS.map((name) => {
    return (
      <div key={name} className="daylabel">
        <div>{name}</div>
      </div>
    );
  });

  return (
    <div className="calendar-monthview">
      <CalendarHeader view={0} styletag="daylabels" dayLabels={dayLabels} />
      <div className="calendar-days">
       {dayList}
      </div>
    </div>
  );
};

export default MonthView;
