import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchAllEvents, updateSelectedDate, updateSelectedView} from '../store';
import CalendarNavBar from './generic/CalendarNavBar';
import MonthView from './Month/MonthView';
import WeekView from './Week/WeekView';
import DayView from './Day/DayView';
import { groupEventsByTime } from '../utility/helpers';
import './calendar.css';

class CalendarContainer extends Component{

  componentDidMount(){
    this.props.loadAllEvents();
  }

  render(){
    let { selectedDate } = this.props;
    let view = this.getCalendarView();
    return (
      <div className="calendar-view">
        <CalendarNavBar onViewChange={this.handleViewChange} onDateChange={this.handleDateChange}
         onDateReset={this.handleDateReset} date={selectedDate}/>
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
        return <WeekView days={this.getWeekViewDays(selectedDate)} selectedView={selectedView}/>;
      case 2:
        return <DayView day={this.getDayViewDay(selectedDate)} selectedView={selectedView}/>;
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
    firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() - (dayOfWeek + 1));

    return this.generateDays(firstDayOfCalendar, 35);
  }

  getWeekViewDays(selectedDate){
    let dayOfWeek = selectedDate.getDay();
    let firstDayOfCalendar = new Date(selectedDate);
    firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() - (dayOfWeek + 1));

    return this.generateDays(firstDayOfCalendar, 7);
  }

  getDayViewDay(selectedDate){
    let day = {};
    day.date = new Date( selectedDate );
    day.yymm = `${day.date.getFullYear()}${day.date.getMonth()}`;
    day.dd = `${day.date.getDate()}`;
    day.events = this.getDayEvents(day);

    return day;
  }

  generateDays(startDate, numOfDays){
    let days = [];
    let nextDay = new Date(startDate);
    let day, date;

    for (let i = 0; i < numOfDays; i++){
      day = {};
      day.date = new Date( nextDay.setDate(nextDay.getDate() + 1) );
      day.yymm = `${day.date.getFullYear()}${day.date.getMonth()}`;
      day.dd = `${day.date.getDate()}`;
      day.events = this.getDayEvents(day);
      days.push(day);
    }
    return days;
  }

  getDayEvents(day){
    let { events } = this.props;
    if(events[day.yymm] && events[day.yymm][day.dd]) return events[day.yymm][day.dd];

    return {};
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
  let groupedEvents = groupEventsByTime(events);

  return {
    events: groupedEvents,
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
