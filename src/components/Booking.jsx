import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';

const FormMessage = ({ inProp }) => (
  <CSSTransition in={inProp} duration={500} classNames="slide">
    <div className="form-message">
      Booked successfully
    </div>
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
      <div className="booking view">
        <div className="header">
          <div className="control">
            <button onClick={() => history.goBack()}><i className="material-icons">arrow_back</i></button>
          </div>
          <div className="heading"><h2>{`Book ${populatedTrip.boat.name}`}</h2></div>
        </div>
        <div className="body transition">
          <form className="booking-form" onSubmit={e => this.handleSubmit(e) || bookTrip(populatedTrip.id, populatedTrip.day)}>
            <label htmlFor="form-name">Name:</label>
            <div className="form-control">
              <input id="form-name" type="text" value={this.state.form['form-name']} onChange={this.handleChange} placeholder="Name" />
              <i className="material-icons">person</i>
            </div>
            <label htmlFor="form-email">Email:</label>
            <div className="form-control">
              <input id="form-email" type="email" value={this.state.form['form-email']} onChange={this.handleChange} placeholder="Email" />
              <i className="material-icons">email</i>
            </div>
            <div className="control">
              <button>Submit</button>
            </div>
          </form>
          <FormMessage inProp={this.state.submit} />
        </div>
      </div>
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
  trip: (id) => {
    const populatedTrip = { ...state.trips.find(trip => trip.id === +id) };
    populatedTrip.boat = state.boats.find(boat => boat.id === populatedTrip.boat);
    return populatedTrip;
  },
});

const mapDispatchToProps = dispatch => ({
  bookTrip: (id, day) => dispatch({ type: 'BOOK_TRIP', id, day }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
