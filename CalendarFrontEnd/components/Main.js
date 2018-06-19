import React from 'react';
import {Link} from 'react-router-dom';

const Main = (props) => {
  return (
    <div>
      <div>
        <Link to="/"> Home </Link>
        <Link to="/calendar"> calendar </Link>
      </div>
      <div> {props.children} </div>
    </div>
  );
};

export default Main;
