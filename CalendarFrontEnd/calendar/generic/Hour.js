import React from 'react';

import EventLabel from '../Event/EventLabel';

const Hour = ({events}) => {

  let hour = (
    <div className="hourcontainer">
      <div className="hour">
        {events.map(event => <EventLabel key={event._id} event={event} />)}
      </div>
    </div>
  );
  return hour;
};

export default Hour;
