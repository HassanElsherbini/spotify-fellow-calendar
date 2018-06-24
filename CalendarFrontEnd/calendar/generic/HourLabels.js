import React from 'react';

import {HOURS} from '../../utility/constants';

const HourLabels = () => {
  return (
    <div className="hourlabels">{
       HOURS.map((hour) => {
        return (
          <div key={hour}>
            <span className="hourlabel"> {hour} </span>
          </div>
        );
      })
    }
    </div>
    );

};

export default HourLabels;
