import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import View from './View';
import Button from './Button';

const FormMessage = ({ inProp }) => (
  <Message inProp={inProp}>Booked successfully</Message>
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
      <View
        header={`Book ${populatedTrip.boat.name}`}
        back={() => history.goBack()}
      >
        <Form
          onSubmit={e =>
            this.handleSubmit(e) ||
            bookTrip(populatedTrip.id, populatedTrip.day)
          }
        >
          <Label htmlFor="form-name">Name:</Label>
          <ControlWrapper>
            <Control
              id="form-name"
              type="text"
              value={this.state.form['form-name']}
              onChange={this.handleChange}
              placeholder="Name"
            />
            <i className="material-icons">person</i>
          </ControlWrapper>
          <Label htmlFor="form-email">Email:</Label>
          <ControlWrapper>
            <Control
              id="form-email"
              type="email"
              value={this.state.form['form-email']}
              onChange={this.handleChange}
              placeholder="Email"
            />
            <i className="material-icons">email</i>
          </ControlWrapper>
          <ButtonWrapper>
            <Button>Submit</Button>
          </ButtonWrapper>
        </Form>
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
    populatedTrip.boat = state.boats.find(
      boat => boat.id === populatedTrip.boat,
    );
    return populatedTrip;
  },
});

const mapDispatchToProps = dispatch => ({
  bookTrip: (id, day) => dispatch({ type: 'BOOK_TRIP', id, day }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);

const Form = styled.form`
  position: relative;
  max-width: 20rem;
  margin: auto;
  padding: 0 5%;
`;
const Label = styled.label`
  display: block;
  position: absolute;
  z-index: -1000;
  left: -10000px;
`;
const ControlWrapper = styled.div`
  box-shadow: 0 0.2rem 0 0 #eee;
  border-radius: 0.2rem;
  display: flex;
  margin: 1rem auto;

  i {
    background: white;
    color: #bbb;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    order: -1;
    transition: color 0.5s;
  }
`;
const Control = styled.input`
  &[type='text'],
  &[type='email'] {
    padding: 0.5rem;
    border: none;
    width: 100%;
  }
  &:focus ~ i {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const Message = styled.div.attrs({
  style: ({ inProp }) => ({
    transform: inProp ? 'translate(-50%, 0)' : 'translate(-50%, 100%)',
  }),
})`
  background: #4caf50;
  color: white;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 700;
  padding: 1.2rem 0;
  margin: auto;
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: 20rem;
  transition: transform 0.5s;
  border-radius: 0.2rem 0.2rem 0 0;
`;
const ButtonWrapper = styled.div`
  max-width: 20rem;
  text-align: right;
  margin: auto;
  margin-bottom: 1rem;
`;
