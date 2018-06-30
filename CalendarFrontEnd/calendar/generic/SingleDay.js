import React from 'react';

import './singleday.css';

const SingleDay = (props) => {
  let { children, todayDate, date} = props;
  let className = todayDate === date ? 'singleday today' : 'singleday';
  return (
    <div className= {className} >
    {
      children
    }
    </div>
  );
};

export default SingleDay;
