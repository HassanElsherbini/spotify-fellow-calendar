import React, {Component} from 'react';
import {fetchAllEvents} from '../store';
import {connect} from 'react-redux';

class Calendar extends Component{

  componentDidMount(){
    this.props.loadAllEvents();
  }

  render(){
    return(
      <div> NO EVENTS TO SEE HERE</div>
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
