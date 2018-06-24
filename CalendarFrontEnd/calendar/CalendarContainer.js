import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchAllEvents, updateSelectedDate, updateSelectedView} from '../store';
import SingleDay from './generic/SingleDay';
import CalendarNavBar from './generic/CalendarNavBar';
import MonthView from './Month/MonthView';
import WeekView from './Week/WeekView';
import DayView from './Day/DayView';
import './calendar.css';

class CalendarContainer extends Component{

  componentDidMount(){
    this.props.loadAllEvents();
  }

  render(){
    let view = this.getCalendarView();
    return (
      <div className="calendar-view">
        <CalendarNavBar onViewChange={this.handleViewChange} onDateChange={this.handleDateChange}
         onDateReset={this.handleDateReset}/>
        <div className="calendar-container">
          <div className="calendar-sidebar"> </div>
          { view }
        </div>
      </div>
    );
  }

  getCalendarView(){
    let { selectedView, selectedDate} = this.props;
    switch (selectedView){
      case 1:
        return <WeekView days={this.getWeekViewDays(selectedDate)} />;
      case 2:
        return <DayView day={this.getDayViewDay(selectedDate)} />;
      default:
        return <MonthView days={this.getMonthViewDays(selectedDate)} />;
    }
  }

  getMonthViewDays(selectedDate){
    let currentMonth = selectedDate.getMonth();
    let currentYear = selectedDate.getFullYear();
    let firstOfMonth = new Date(currentYear, currentMonth, 1);
    let firstDayOfCalendar = new Date(firstOfMonth);
    let dayOfWeek = firstOfMonth.getDay();
    firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() - dayOfWeek);

    return this.generateDays(firstDayOfCalendar, 35);
  }

  generateDays(startDate, numOfDays){
    let days = [startDate];
    let nextDay = new Date(startDate);
    let day;

    for (let i = 1; i < numOfDays; i++){
      day = nextDay.setDate(nextDay.getDate() + 1);
      days.push(new Date(day));
    }

    return days;
  }

  getWeekViewDays(selectedDate){
    let dayOfWeek = selectedDate.getDay();
    let firstDayOfCalendar = new Date(selectedDate);
    firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() - dayOfWeek);

    return this.generateDays(firstDayOfCalendar, 7);
  }

  getDayViewDay(selectedDate){
    return new Date(selectedDate);
  }

  handleDateChange = (direction) => {
    let {selectedView, selectedDate, changeSelectedDate} = this.props;
    let newDate = new Date(selectedDate);

    if (selectedView === 0) newDate.setMonth(newDate.getMonth() + direction);
    else if (selectedView === 1) newDate.setDate(newDate.getDate() + (7 * direction));
    else newDate.setDate(newDate.getDate() + direction);

    changeSelectedDate(newDate);
  }

  handleDateReset = () => {
    let { changeSelectedDate } = this.props;
    changeSelectedDate(new Date());
  }

  handleViewChange = (view) => {
    let { changeSelectedView } = this.props;
    changeSelectedView(view);
  }
}

const mapStateToProps = ({events, selectedDate, selectedView}) => {
  return {
    events,
    selectedDate,
    selectedView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllEvents: () => dispatch(fetchAllEvents()),
    changeSelectedDate: (newDate) => dispatch(updateSelectedDate(newDate)),
    changeSelectedView: (newView) => dispatch(updateSelectedView(newView))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
