import React, {Component} from 'react';
import {fetchAllEvents} from '../store';
import {connect} from 'react-redux';
import SingleDay from '../components/SingleDay';
import CalendarNavBar from '../components/CalendarNavBar';
import CalendarByMonth from '../components/CalendarByMonth';

import '../styles/calendar.css';

class Calendar extends Component{

  componentDidMount(){
    this.props.loadAllEvents();
  }

  render(){
    let {events} = this.props;
    let days = [];
    for (let i = 0; i < 35; i++){ days.push(<SingleDay id={i} num={i+1} />); }

    return (
      <div className="calendar-view">
        <CalendarNavBar />
          <div className="calendar-container">
            <div className="calendar-sidebar"> </div>
            <CalendarByMonth days={days} />
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllEvents: () => dispatch(fetchAllEvents())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
