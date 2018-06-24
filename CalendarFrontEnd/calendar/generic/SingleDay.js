import React from 'react';
import './singleday.css';

const SingleDay = (props) => {
  let { view = 0, hours, dayNum } = props;
  let weekDay = <div className="weekview-day">{hours}</div>;
  let monthDay = <div> {dayNum}</div>;

  return (
    <div className="singleday">
    {
      view === 0 ? monthDay : weekDay
    }
    </div>
  );
};

export default SingleDay;
