import React,{ Component } from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DescriptionIcon from '@material-ui/icons/Description';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {MONTHS, WEEK_DAYS} from '../../utility/constants';
import EventForm from './EventForm';
import { removeEvent } from '../../store';
import {connect} from 'react-redux';

class EventviewPicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEdit: false
    };
  }

  render(){
    let {event, day, close} = this.props;
    let { isEdit } = this.state;

    return isEdit
      ? <EventForm day={day} isEdit={isEdit} event={event} close={close} />
      : this.getEventCard();
  }

  handleViewChange = () => {
    this.setState({isEdit: true});
  }

  handleEventDelete = () => {
    let { event, deleteEvent} = this.props;
    deleteEvent(event._id);
  }
  getEventCard(){
    let {event, eventTimeInfor, deleteEvent} = this.props;
    let { startStr, endStr, dd, mm, weekDay } = eventTimeInfor;
    return (
      <div className="event-card">
        <div className="event-cardtop">
          <div className="event-cardbar">
          <div title="Delete event" onClick={this.handleEventDelete}>
            <DeleteIcon id="delete-btn" />
          </div>

          </div>
          <div className="event-cardTitle">{event.title}</div>
        </div>
        <div className="event-cardbottom">
          <div className="edit-btn">
            <div title="Edit event" onClick={this.handleViewChange} >
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


const mapDispatchToProps = (dispatch) => {
  return {
    deleteEvent: (eventId) => dispatch(removeEvent(eventId))
  };
};

export default connect(null, mapDispatchToProps)(EventviewPicker);
