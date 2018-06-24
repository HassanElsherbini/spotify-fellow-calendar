import React from 'react';
import './calendarNavBar.css';
import { VIEWS } from '../../utility/constants';

const CalendarNavBar = (props) => {
  let { onDateChange, onDateReset, onViewChange } = props;
  return (
    <div className="calendar-navbar">
      <div></div>
      <div className="date-nav">
        <div className="nav-controls">
          <button id="reset-date" onClick={() => { onDateReset(); } }>today</button>
          <button id="prev-date" onClick={() => { onDateChange(-1); } }>prev</button>
          <button id="next-date" onClick={() => { onDateChange(1); } }>next</button>
        </div>
        <div className="date-label"></div>
      </div>
      <div className="view-nav">
          <button onClick={() => { onViewChange(0); } }>Month</button>
          <button onClick={() => { onViewChange(1); } }>Week</button>
          <button onClick={() => { onViewChange(2); } }>Day</button>
      </div>
    </div>
  );
};

export default CalendarNavBar;
