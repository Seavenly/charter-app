import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';

import Trip from './Trip';

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
    this.setState(prevState => ({ imagesLoaded: prevState.imagesLoaded + 1 }));
  }

  availableTrips() {
    let available = [];
    const trips = this.props.trips(this.props.match.params.day);
    if (trips) {
      available = trips.filter(t => !t.booked).map((t, index) =>
        <li key={t.id}><Trip trip={t} delay={`${0.5 - ((0.3 / trips.length) * index)}s`} loaded={() => this.handleImageLoaded()} /></li>);
    }
    return available;
  }

  render() {
    const { history, moment } = this.props;
    return (
      <div className="trips view">
        <div className="header">
          <div className="control">
            <button onClick={() => history.goBack()}><i className="material-icons">arrow_back</i></button>
          </div>
          <div className="heading"><h2>{moment.format('ddd, MMM D YYYY')}</h2></div>
        </div>
        <div className={`body transition${this.state.imagesLoaded >= this.state.trips.length ? ' loaded' : ''}`}>
          <div className="available-trips">
            {
              this.state.trips.length ?
                <ul className="trips-list">{this.state.trips}</ul> :
                <p>There are no available trips for this date.</p>
            }
          </div>
          <div className="spinner">
            <i className="material-icons">autorenew</i>
          </div>
        </div>
      </div>
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
  trips: (date) => {
    const tripDay = { ...state.days.find(day => day.date === date) };
    if (tripDay.trips) {
      tripDay.trips = tripDay.trips.map((tripId) => {
        const populatedTrip = { ...state.trips.find(t => t.id === tripId) };
        populatedTrip.boat = state.boats.find(boat => populatedTrip.boat === boat.id);
        return populatedTrip;
      });
    }
    return tripDay.trips;
  },
  moment: state.calendar,
});

export default connect(mapStateToProps)(Trips);
