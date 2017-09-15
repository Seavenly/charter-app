import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import 'normalize.css';

import store from './store/index';
import Calendar from './components/Calendar';
import Trips from './components/Trips';
import Booking from './components/Booking';

import './App.css';

const WithRouter = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames={'fade'} timeout={1000}>
      <Switch location={location}>
        <Route exact path="/" component={Calendar} />
        <Route exact path="/trips/:day" component={Trips} />
        <Route exact path="/book/:trip" component={Booking} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="app">
        <WithRouter />
      </div>
    </Router>
  </Provider>
);

export default App;
