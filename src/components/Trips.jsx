import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import styled from 'styled-components';

import View from './View';
import Trip from './Trip';
import Spinner from './Spinner';

class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: this.availableTrips(),
      imagesLoaded: 0,
      allLoaded: false,
    };

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.availableTrips = this.availableTrips.bind(this);
  }

  handleImageLoaded() {
    this.setState(prevState => ({
      imagesLoaded: prevState.imagesLoaded + 1,
      allLoaded: prevState.imagesLoaded + 1 >= prevState.trips.length,
    }));
  }

  availableTrips() {
    let available = [];
    const trips = this.props.trips(this.props.match.params.day);
    if (trips) {
      available = trips.filter(t => !t.booked).map((t, index) => (
        <Item
          key={t.id}
          delay={0.5 - 0.3 / trips.length * index}
          allLoaded={this.state && this.state.allLoaded}
        >
          <Trip trip={t} loaded={() => this.handleImageLoaded()} />
        </Item>
      ));
    }
    return available;
  }

  render() {
    const { history, moment } = this.props;
    return (
      <View
        header={moment.format('ddd, MMM D YYYY')}
        back={() => history.goBack()}
      >
        {this.state.trips.length ? (
          <List>{this.availableTrips()}</List>
        ) : (
          <Message>There are no available trips for this date.</Message>
        )}
        <Spinner
          isVisible={this.state.imagesLoaded < this.state.trips.length}
        />
      </View>
    );
  }
}

Trips.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  trips: PropTypes.func.isRequired,
  moment: PropTypes.instanceOf(Moment).isRequired,
};

const mapStateToProps = state => ({
  trips: date => {
    const tripDay = { ...state.days.find(day => day.date === date) };
    if (tripDay.trips) {
      tripDay.trips = tripDay.trips.map(tripId => {
        const populatedTrip = { ...state.trips.find(t => t.id === tripId) };
        populatedTrip.boat = state.boats.find(
          boat => populatedTrip.boat === boat.id,
        );
        return populatedTrip;
      });
    }
    return tripDay.trips;
  },
  moment: state.calendar,
});

export default connect(mapStateToProps)(Trips);

const Item = styled.li.attrs({
  style: ({ allLoaded, delay }) => ({
    opacity: allLoaded ? 1 : 0,
    transform: allLoaded ? 'translateY(0)' : 'translateY(-100%)',
    transitionDelay: `${delay}s`,
  }),
})`
  padding: 0.5rem;
  flex: 1 1 100%;
  max-width: 16rem;
  transition: all 0.3s;
  opacity: 0;
  transform: translateY(-100%);
  position: relative;
  z-index: 1;
  @media (min-width: 31.25rem) {
    flex: 0 0 calc(50% - 1rem);
  }
`;
const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 31.25rem) {
    justify-content: flex-start;
  }
`;
const Message = styled.p`
  padding: 1rem 0 2rem;
`;
