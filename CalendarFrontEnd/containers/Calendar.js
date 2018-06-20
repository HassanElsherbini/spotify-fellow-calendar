import React, {Component} from 'react';
import {fetchAllEvents, updateCurrentDate} from '../store';
import {connect} from 'react-redux';
import SingleDay from '../components/SingleDay';
import CalendarNavBar from '../components/CalendarNavBar';
import CalendarByMonth from '../components/CalendarByMonth';
import {getFirstDayOfMonth, getEndOfMonth} from '../utility/helpers';
import '../styles/calendar.css';

class Calendar extends Component{

  componentDidMount(){
    this.props.loadAllEvents();
    this.getCalendarDays();
  }

  render(){
    let {events} = this.props;
    let days = this.getCalendarDays();
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

  getCalendarDays(){
    let currentDate = new Date(2018, 7, 2);
    let currentMonth = currentDate.getMonth();
    let endOfMonth = getEndOfMonth(currentMonth);

    let daysPrevMonth = this.getPrevMonthDays();
    let daysCurrentMonth = this.genCurrentMonthDays(endOfMonth);
    let daysNextMonth = this.genNextMonthDays(35 - (daysPrevMonth.length + daysCurrentMonth.length));
    let generatedDays = [...daysPrevMonth, ...daysCurrentMonth, ...daysNextMonth];

    return generatedDays;
  }

  getPrevMonthDays(){
    let currentDate = new Date(2018, 7, 2);
    let currentMonth = currentDate.getMonth();
    let firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    let endOfPrevMonth = getEndOfMonth(currentMonth - 1);
    let start = endOfPrevMonth - firstDayOfMonth;
    let end = endOfPrevMonth;
    let days = [];

    for (let i = start; i < end; i++){
      days.push(<SingleDay num={i + 1} />);
    }
    return days;
  }

  genCurrentMonthDays(dayCount){
    let days = [];
    for (let i = 1; i <= dayCount; i++){
      days.push(<SingleDay num={i} />);
    }
    return days;
  }

  genNextMonthDays(dayCount){
    let days = [];
    for (let i = 1; i <= dayCount; i++){
      days.push(<SingleDay num={i} />);
    }
    return days;
  }

}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    currentDate: state.currentDate
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllEvents: () => dispatch(fetchAllEvents()),
    changeCurrentDate: (newDate) => dispatch(updateCurrentDate(newDate))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
