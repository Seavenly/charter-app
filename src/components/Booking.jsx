import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';

import View from './View';

const FormMessage = ({ inProp }) => (
  <CSSTransition in={inProp} duration={500} classNames="slide">
    <div className="form-message">Booked successfully</div>
  </CSSTransition>
);

FormMessage.propTypes = {
  inProp: PropTypes.bool.isRequired,
};

class Booking extends Component {
  constructor() {
    super();
    this.state = {
      form: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ form: { [e.target.id]: e.target.value } });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submit: true, form: {} });
  }

  render() {
    const { history, match, trip, bookTrip } = this.props;
    const populatedTrip = trip(match.params.trip);

    return (
      <View header={`Book ${populatedTrip.boat.name}`} back={() => history.goBack()}>
        <form
          className="booking-form"
          onSubmit={e => this.handleSubmit(e) || bookTrip(populatedTrip.id, populatedTrip.day)}
        >
          <label className="booking-form__label" htmlFor="form-name">
            Name:
          </label>
          <div className="booking-form__control-wrapper">
            <input
              className="booking-form__control"
              id="form-name"
              type="text"
              value={this.state.form['form-name']}
              onChange={this.handleChange}
              placeholder="Name"
            />
            <i className="material-icons">person</i>
          </div>
          <label className="booking-form__label" htmlFor="form-email">
            Email:
          </label>
          <div className="booking-form__control-wrapper">
            <input
              className="booking-form__control"
              id="form-email"
              type="email"
              value={this.state.form['form-email']}
              onChange={this.handleChange}
              placeholder="Email"
            />
            <i className="material-icons">email</i>
          </div>
          <div className="control">
            <button className="control__btn">Submit</button>
          </div>
        </form>
        <FormMessage inProp={this.state.submit} />
      </View>
    );
  }
}

Booking.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  trip: PropTypes.func.isRequired,
  bookTrip: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  trip: id => {
    const populatedTrip = { ...state.trips.find(trip => trip.id === +id) };
    populatedTrip.boat = state.boats.find(boat => boat.id === populatedTrip.boat);
    return populatedTrip;
  },
});

const mapDispatchToProps = dispatch => ({
  bookTrip: (id, day) => dispatch({ type: 'BOOK_TRIP', id, day }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
