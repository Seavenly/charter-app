import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';

import Trip from './Trip';

/**
 * Setup available trip components otherwise say no trips available
 * @param {Object[]} trips - populted trip objects for the selected day
 * @returns available trips with animation delays
 */
function availableTrips(trips) {
  let available = [];
  if (trips) {
    available = trips.filter(t => !t.booked).map((t, index) =>
      <li key={t.id}><Trip trip={t} delay={`${0.5 - ((0.3 / trips.length) * index)}s`} /></li>);
  }
  return available.length ? <ul className="trips-list">{available}</ul>
    : <div className="no-trips">There are no available trips for this date.</div>;
}

const Trips = ({ history, match, trips, moment }) => (
  <div className="trips view">
    <div className="header">
      <div className="control">
        <button onClick={() => history.goBack()}><i className="material-icons">arrow_back</i></button>
      </div>
      <div className="heading"><h2>{moment.format('ddd, MMM D YYYY')}</h2></div>
    </div>
    <div className="body transition">
      {availableTrips(trips(match.params.day))}
    </div>
  </div>
);

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
