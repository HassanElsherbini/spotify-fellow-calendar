import React from 'react';
import Popup from 'reactjs-popup';
import Icon from '@material-ui/core/Icon';

import CalendarHeader from '../generic/CalendarHeader';
import HourLabels from '../generic/HourLabels';
import SingleDay from '../generic/SingleDay';
import {WEEK_DAYS} from '../../utility/constants';
import HourList from '../generic/HourList';
import AddEvent from '../Event/AddEvent';

const DayView = ({day}) => {

  let dayOfWeek = day.date.getDay();
  let dayName = WEEK_DAYS[dayOfWeek];
  let addEventBtn = (
    <div className="addbtn-container" title="New event">
      <Icon style={{ fontSize: 40 }} className="add-btn " color="primary"> add_circle </Icon>
    </div>);

  let dayLabels = [
    <div key={dayName}className="daylabel-week">
      <div> {dayName} </div>
      <div>{day.dd}</div>
      <Popup
          key={day.dd}
          trigger={addEventBtn}
          closeOnDocumentClick
          contentStyle ={contentStyle}
          overlayStyle={overlayStyle}
          modal
        >
        { close => ( <AddEvent day={day} close={close} time="7:00" /> ) }
      </Popup>
    </div>
  ];

  return (
    <div className="calendar-multiday">
      <div className="view-header">
          <CalendarHeader styletag="dayheader gap-left" view={2} dayLabels={dayLabels} />
      </div>
      <div className="multiday-dayscontainer">
        <HourLabels />
        <div className="dayview-daycontainer">
          <SingleDay>
            <div className="weekview-day">
              <HourList day={day} />
            </div>
          </SingleDay>
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

export default DayView;
