import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { getTimeValues } from '../../utility/helpers';
import { MONTHS, HOURS } from '../../utility/constants';
import { createEvent } from '../../store';
import TimePicker from '../generic/TImePicker';
import './event.css';

class AddEvent extends Component {
  constructor(props){
    super(props);
    this.state = {
      startTime: '',
      endTime: '',
      title: '',
      description: '',
      titleErrorTxt: '',
      startErrorTxt: '',
      endErrorTxt: ''
    };
  }

  render(){
    let { titleErrorTxt, startErrorTxt, endErrorTxt } = this.state;
    let { day, closePrevious } = this.props;
    let header = this.createHeader(day);
    closePrevious();
    return (
      <form className="addevent-form" onSubmit={this.handleSubmit}>
        <Typography style={styles.header} color="textSecondary">
            {header}
        </Typography>
        <div className="form-group">
          <TextField
              id="title"
              placeholder= "Add Title"
              required
              onChange={this.handleChange('title')}
            />
          <div className="error-text">{titleErrorTxt}</div>
        </div>

        <TextField
          id="description"
          placeholder= "Description"
          multiline
          rows="2"
          rowsMax="3"
          onChange={this.handleChange('description')}
        />

        <TimePicker handleChange={this.handleChange} startErrorTxt={startErrorTxt}
                    endErrorTxt={endErrorTxt} />

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
    console.log(errors)
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

  createHeader(day){
    let header = `${MONTHS[day.date.getMonth()]}, ${day.dd}, ${day.date.getFullYear()}`;

    return header;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let isErr = this.validate();
    if(!isErr){
      let { startTime, endTime, title, description } = this.state;
      let { day, addEvent, close, selectedView, hour } = this.props;
      let startDate = new Date(day.date);
      let endDate = new Date(day.date);

      let starthhmm = getTimeValues(startTime);
      let endhhmm = getTimeValues(endTime);
      startDate.setHours(starthhmm[0], starthhmm[1]);
      endDate.setHours(endhhmm[0], endhhmm[1]);

      let event = {
        title,
        description,
        startDate,
        endDate
      }

      addEvent(event);
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
  };
};

export default connect(null, mapDispatchToProps)(AddEvent);
