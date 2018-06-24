import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './Main';
import CalendarContainer from './calendar/CalendarContainer';

class Routes extends Component {
  render() {
    return(
      <BrowserRouter>
        <Main>
          <Switch>
            <Route exact path="/" component={CalendarContainer} />
          </Switch>
        </Main>
      </BrowserRouter>
    );
  }

}

export default Routes;
