import React from 'react';

import SingleDay from '../generic/SingleDay';
import HourLabels from '../generic/HourLabels';
import CalendarHeader from '../generic/CalendarHeader';
import {WEEK_DAYS} from '../../utility/constants';
import HourList from '../generic/HourList';
import Popup from 'reactjs-popup';
import Icon from '@material-ui/core/Icon';

import EventForm from '../Event/EventForm';

const WeekView = ({days, selectedView}) => {
  let addEventBtn = (
      <div className="addbtn-container" title="New event">
      <Icon style={{ fontSize: 20 }} className="add-btn " color="primary"> add_circle </Icon>
    </div>
  );

  let dayLabels = WEEK_DAYS.map((name, indx) => {
    let dayNum = days[indx].dd;
    return (
      <div key={name} className="daylabel left-border">
        <div>{name}</div>
        <div>{dayNum}</div>
        <Popup
          key={indx}
          trigger={addEventBtn}
          closeOnDocumentClick
          contentStyle ={contentStyle}
          overlayStyle={overlayStyle}
          modal
        >
          { close => ( <EventForm day={days[indx]} close={close} time="7:00" /> ) }
        </Popup>
      </div>
    );
  });

  let dayList = [];
  let day;
  let todayDate = new Date().toDateString();
  let date = '';
  for (let i = 0; i < 7; i++) {
    date = days[i].date.toDateString();
    day = (<SingleDay key={i} todayDate={todayDate} date={date}>
            <div className="weekview-day">
              <HourList day={days[i]} selectedView={selectedView} />
            </div>
           </SingleDay>);
    dayList.push(day);
  }

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

let contentStyle = {
  width: "550px",
  minHeight: "32vh",
  paddingTop: "30px"
};
let overlayStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)"
};

export default WeekView;
