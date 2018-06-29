import React,{ component, Component } from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DescriptionIcon from '@material-ui/icons/Description';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {MONTHS, WEEK_DAYS} from '../../utility/constants';
import AddEvent from './AddEvent';

export default class EventviewPicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayEditForm: false
    };
  }

  render(){
    let {event} = this.props;
    return this.state.displayEditForm ? <AddEvent /> : this.getEventCard();
  }

  getEventCard(){
    let {event, startStr, endStr, dd, mm, weekDay} = this.props;
    return (
      <div className="event-card">
        <div className="event-cardtop">
          <div className="event-cardbar">
          <div title="Delete event">
            <DeleteIcon id="delete-btn" />
          </div>

          </div>
          <div className="event-cardTitle">{event.title}</div>
        </div>
        <div className="event-cardbottom">
          <div className="edit-btn">
            <div title="Edit event" >
            <EditIcon id="editIcon" />
            </div>
          </div>
          <div className="event-datebox">
            <AccessTimeIcon className="event-icon" />
            <div className="event-date">
              <div id="date-yymmdd">{`${WEEK_DAYS[weekDay]}, ${MONTHS[mm]} ${dd}`}</div>
              <div id="event-duration">{`${startStr} - ${endStr}`}</div>
            </div>
          </div>
          <div className="event-description">
            <DescriptionIcon className="event-icon" />
            <div className="description-txt">{event.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

