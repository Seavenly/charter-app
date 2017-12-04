import React from 'react';
import { Provider } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled, { ThemeProvider } from 'styled-components';
import 'normalize.css';

import '@src/globalStyles';
import theme from '@src/theme';
import store from '@src/store';
import Calendar from '@src/components/Calendar';
import Trips from '@src/components/Trips';
import Booking from '@src/components/Booking';

const Paths = ({ location }: RouteComponentProps<undefined>) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="fade" timeout={1000}>
      <Switch location={location}>
        <Route exact path="/" component={Calendar} />
        <Route exact path="/trips/:date" component={Trips} />
        <Route exact path="/book/:date/:tripId" component={Booking} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
);
const WithRouter = withRouter(Paths);

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router basename="">
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
