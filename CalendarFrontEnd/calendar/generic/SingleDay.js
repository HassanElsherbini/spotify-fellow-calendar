import React from 'react';

import './singleday.css';

const SingleDay = (props) => {
  let { children } = props;

  return (
    <div className="singleday" >
    {
      children
    }
    </div>
  );
};

export default SingleDay;
