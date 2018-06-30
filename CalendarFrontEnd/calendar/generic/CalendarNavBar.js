import React from 'react';
import Button from '@material-ui/core/Button';
import PrevIcon from '@material-ui/icons/ChevronLeft';
import NextIcon from '@material-ui/icons/ChevronRight';

import './calendarNavBar.css';
import ViewMenu from './ViewMenu';
import { MONTHS } from '../../utility/constants';

const CalendarNavBar = (props) => {
  let { onDateChange, onDateReset, onViewChange, date } = props;
  return (
    <div className="calendar-navbar">
      <div></div>
      <div className="date-nav">
        <div className="nav-controls">
          <div className="controls">
            <Button id= "nav-btn"
              size="medium"
              aria-haspopup="true"
              onClick={() => { onDateReset(); } }
            >Today </Button>
            <PrevIcon className="pointer" id="prev-date" onClick={() => { onDateChange(-1); } } />
            <NextIcon className="pointer" id="next-date" onClick={() => { onDateChange(1); } } />
          </div>
        </div>
        <div className="date-label">
          {`${MONTHS[date.getMonth()]} ${date.getFullYear()}`}
        </div>
      </div>
      <ViewMenu changeView={(view) => { onViewChange(view); }} />
    </div>
  );
};

export default CalendarNavBar;
