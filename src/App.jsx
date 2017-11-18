import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled, { ThemeProvider } from 'styled-components';

import 'normalize.css';
import './GlobalStyles';
import theme from './Theme';

import store from './store/index';
import Calendar from './components/Calendar';
import Trips from './components/Trips';
import Booking from './components/Booking';

const WithRouter = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="fade" timeout={1000}>
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
    <ThemeProvider theme={theme}>
      <Router basename="/charter-app">
        <AppContainer>
          <WithRouter />
        </AppContainer>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;

const AppContainer = styled.div`
  max-width: 30rem;
  margin: auto;
  font-family: 'Roboto', sans-serif;
  position: relative;
  background: #fafafa;
  overflow: hidden;
`;
