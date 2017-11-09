/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Link } from 'react-router-dom';

const Trip = ({ trip, delay, loaded }) => (
  <div className="trip" style={{ animationDelay: delay }}>
    <div className="trip__top">
      <div className="trip__image">
        <div className="trip__overlay" style={{ background: trip.boat.color }} />
        <img src={trip.boat.image} alt={trip.boat.name} onLoad={() => loaded()} />
      </div>
      <div className="trip__info">
        <div className="trip__title">
          <h3 className="trip__boat-name">{trip.boat.name}</h3> {trip.boat.size}
        </div>
        <div className="trip__time">
          <span className="trip__type" style={{ color: trip.boat.color }}>
            {new Moment(`${trip.day}T${trip.start}`).hour() < 12 ? 'AM' : 'PM'}
          </span>
          <span>
            {new Moment(`${trip.day}T${trip.start}`).format('h:mm A')} -{' '}
            {new Moment(`${trip.day}T${trip.end}`).format('h:mm A ')}
          </span>
        </div>
      </div>
    </div>
    <div className="control">
      <Link to={`/book/${trip.id}`}>
        <button className="control__btn">Book Now</button>
      </Link>
    </div>
  </div>
);

Trip.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.number,
    boat: PropTypes.object,
    day: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    booked: PropTypes.bool,
  }).isRequired,
  delay: PropTypes.string,
  loaded: PropTypes.func.isRequired,
};

Trip.defaultProps = {
  delay: '500',
};

export default Trip;
