import React from 'react';
import Popup from "reactjs-popup";
import Icon from '@material-ui/core/Icon';

import CalendarHeader from '../generic/CalendarHeader';
import {WEEK_DAYS} from '../../utility/constants';
import SingleDay from '../generic/SingleDay';
import { getEventList, formatTime } from '../../utility/helpers';
import AddEvent from '../Event/AddEvent';
import EventLabel from '../Event/EventLabel';


let contentStyle = {
  width: "550px",
  minHeight: "32vh"
};
let overlayStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)"
};


const MonthView = (props) => {
  let { days } = props;
  let eventList;
  let dayList = days.map((day, idx) => {
    eventList = day.events ? getEventList(day.events) : [];
    let addEventBtn =  <Icon style={{ fontSize: 20 }} className="add-btn" color="primary"> add_circle </Icon>

    let dayContainer = (
      <SingleDay >
        <div className="singleday-header">
          <div className="daynum"> {day.dd}</div>
            <Popup
              key={idx}
              trigger={addEventBtn}
              closeOnDocumentClick
              contentStyle ={contentStyle}
              overlayStyle={overlayStyle}
              modal
            >
             { close => ( <AddEvent day={day} close={close} time="7:00" /> ) }
            </Popup>
          </div>
          <div className="events-monthview">
            { eventList.map(event => <EventLabel key={event._id} event={event} day={day} />) }
          </div>
        </SingleDay>
    );

    return (dayContainer);
  });

  let dayLabels = WEEK_DAYS.map((name) => {
    return (
      <div key={name} className="daylabel right-border">
        <div className="dayname">{name}</div>
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
