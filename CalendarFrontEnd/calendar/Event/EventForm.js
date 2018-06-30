import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { getTimeValues } from '../../utility/helpers';
import { MONTHS, HOURS } from '../../utility/constants';
import { createEvent, updateEvent } from '../../store';
import TimePicker from '../generic/TimePicker';
import { getEventFormDefault, formatTime } from '../../utility/helpers';

import './event.css';

class EventForm extends Component {
  constructor(props){
    super(props);
    let {isEdit, event} = props;
    let defaultValues = getEventFormDefault(event, isEdit);
    this.state = {
      ...defaultValues,
      titleErrorTxt: '',
      startErrorTxt: '',
      endErrorTxt: ''
    };
  }

  render(){
    let { titleErrorTxt, startErrorTxt,endErrorTxt,
          title, description, startTime, endTime, date } = this.state;

    let { day, isEdit, event} = this.props;
    let header = this.createHeader(day, isEdit, event);

    return (
      <form className="addevent-form" onSubmit={this.handleSubmit}>
        <Typography style={styles.header} color="textSecondary">
            {header}
        </Typography>
        <div className="form-group">
          <TextField
              id="title"
              defaultValue = {title}
              placeholder= "Add Title"
              required
              onChange={this.handleChange('title')}
            />
          <div className="error-text">{titleErrorTxt}</div>
        </div>

        <TextField
          id="description"
          placeholder= "Description"
          defaultValue= {description}
          multiline
          rows="2"
          rowsMax="3"
          onChange={this.handleChange('description')}
        />

        <TimePicker handleChange={this.handleChange} isEdit={isEdit}
                    startErrorTxt={startErrorTxt} endErrorTxt={endErrorTxt}
                    startTime={startTime} endTime={endTime} date={date} />

        <Button type="submit" variant="contained" color="primary">
          save
        </Button>

      </form>
    );
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  validate = () => {
    let defaultErrMsg = '*required';
    let isError = false;
    let { title } = this.state;

    let errors = {
      titleErrorTxt: '',
      startErrorTxt: '',
      endErrorTxt: '',
    };

    if(!title.length){
      errors.titleErrorTxt = defaultErrMsg;
      isError = true;
    }

    let isValidTime = this.validateTime(errors, defaultErrMsg);

    this.setState({...this.state, ...errors});

    return !isValidTime || isError;
  }

  validateTime(errors, defaultErrMsg){
    let { startTime, endTime } = this.state;
    let isValidTime = true;
    let timeErrMsg = 'invalid time';

    if(!startTime.length) {
      errors.startErrorTxt = defaultErrMsg;
      isValidTime = false;
    }
    if (!endTime.length){
      errors.endErrorTxt = defaultErrMsg;
      isValidTime = false;
    }

    if(isValidTime) {
      isValidTime = this.validHours(startTime, endTime);
      errors.endErrorTxt = !isValidTime ? timeErrMsg : '';
    }

    return isValidTime;
  }
  validHours (startTime, endTime) {
    let startValues = getTimeValues(startTime);
    let endValues = getTimeValues(endTime);

    if((startValues[0] === endValues[0]) && (startValues[1] >= endValues[1]))
      return false;

    if(startValues[0] > endValues[0]) return false;

    return true;
  }

  createHeader(day, isEdit, event){
    let header = '';
    if(!isEdit) {
      header = `${MONTHS[day.date.getMonth()]}, ${day.dd}`;
    } else {
      let start = new Date(event.startDate);
      let end = new Date(event.endDate);

      let startTime = formatTime(start);
      let endTime = formatTime(end);
      let month = start.getMonth();
      let day = start.getDate();
      let headerHour = `${startTime} - ${endTime}`;
      header = `${MONTHS[month]}, ${day} (${headerHour})`;
    }

    return header;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let isErr = this.validate();
    if(!isErr){
      let { startTime, endTime, title, description, date } = this.state;
      let { day, isEdit, addEvent, editEvent, event, close } = this.props;

      let starthhmm = getTimeValues(startTime);
      let endhhmm = getTimeValues(endTime);
      let startDate, endDate;
      if(!isEdit){
        startDate = new Date(day.date);
        endDate = new Date(day.date);
        startDate.setHours(starthhmm[0], starthhmm[1]);
        endDate.setHours(endhhmm[0], endhhmm[1]);
      } else {
         let yymmdd = date.split('-');
         startDate = new Date(yymmdd[0],Number(yymmdd[1]) - 1, yymmdd[2], starthhmm[0], starthhmm[1]);
         endDate = new Date(yymmdd[0],Number(yymmdd[1]) - 1, yymmdd[2], endhhmm[0], endhhmm[1]);
      }

      let newEvent = {
        title,
        description,
        startDate,
        endDate
      }

      if(!isEdit) addEvent(newEvent);
      else {
        newEvent._id = event._id;
        editEvent(newEvent);
      }
      close();
    }
  }
}

const styles = {
  header: {fontSize: 20}
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (newEvent) => dispatch(createEvent(newEvent)),
    editEvent: (newEvent) => dispatch(updateEvent(newEvent))
  };
};

export default connect(null, mapDispatchToProps)(EventForm);
