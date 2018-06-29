import React from 'react';
import Popup from 'reactjs-popup';

import EventviewPicker from './EventviewPicker';
import { formatTime } from '../../utility/helpers';


let contentStyle = {
  width: "500px",
  minHeight: "25vh",
  padding: 0,
  border: 0
};
let overlayStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)"
};

const EventLabel = ({event, day}) => {
  let startStr = formatTime(event.startDate);
  let endStr = formatTime(event.endDate);
  let startDate = new Date(event.startDate);
  let dd = startDate.getDate();
  let mm = startDate.getMonth();
  let weekDay = startDate.getDay();

  let label = (
    <div id="event-label" title={event.title}> {`${startStr}  ${event.title}`} </div>
  );

  return (
    <Popup
    trigger={label}
    closeOnDocumentClick
    contentStyle ={contentStyle}
    overlayStyle={overlayStyle}
    modal
    >
    <EventviewPicker eventTimeInfor = {{startStr, endStr, dd, mm, weekDay}} event={event} day={day} />
    </Popup>
  );
};

export default EventLabel;
