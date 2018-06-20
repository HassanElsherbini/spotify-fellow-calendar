import React from 'react';
import '../styles/singleday.css';

const SingleDay = (props) => {
  let num = props.num;
  return (
    <div className="singleday"> {num} </div>
  );
};

export default SingleDay;
