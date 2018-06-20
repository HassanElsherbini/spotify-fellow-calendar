import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';
import Calendar from './containers/Calendar';

class Routes extends Component {
  render() {
    return(
      <BrowserRouter>
        <Main>
          <Switch>
            <Route exact path="/" component={Calendar} />
          </Switch>
        </Main>
      </BrowserRouter>
    );
  }

}

export default Routes;
