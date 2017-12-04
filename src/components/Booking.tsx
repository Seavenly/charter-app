import React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import dateFns from 'date-fns';

import styled, { withProps } from '@src/styledComponents';
import { IStoreState } from '@src/store';
import { ITrip } from '@src/store/data/trips';
import actions from '@src/store/actions';
import View from '@src/components/View';
import Button from '@src/components/Button';
import SVG, { Icon } from '@src/components/SVG';

const FormMessage: React.StatelessComponent<IMessageProps> = ({ inProp }) => (
  <Message inProp={inProp}>Booked successfully</Message>
);

interface IRouteParams {
  tripId: string;
  date: string;
}
type Props = ReduxProps & RouteComponentProps<IRouteParams>;

interface IState {
  form: {
    [field: string]: string;
  };
  submit: boolean;
  trip: ITrip | undefined;
}

class Booking extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    const [year, month, day] = props.match.params.date.split('-');
    this.state = {
      form: {},
      submit: false,
      trip: props.trip(
        props.match.params.tripId,
        new Date(+year, +month - 1, +day),
      ),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render() {
    if (
      this.state.trip === undefined ||
      typeof this.state.trip.boat === 'string'
    ) {
      return null;
    }

    return (
      <View
        header={`Book ${this.state.trip.boat.name}`}
        back={this.props.history.goBack}
      >
        <Form onSubmit={this.handleSubmit}>
          <Label htmlFor="form-name">Name:</Label>
          <ControlWrapper>
            <Control
              id="form-name"
              type="text"
              value={this.state.form['form-name']}
              onChange={this.handleChange}
              placeholder="Name"
            />
            <SVG icon={Icon.Person} />
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
            <SVG icon={Icon.Email} />
          </ControlWrapper>
          <ButtonWrapper>
            <Button>Submit</Button>
          </ButtonWrapper>
        </Form>
        <FormMessage inProp={this.state.submit} />
      </View>
    );
  }

  private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ form: { [e.target.id]: e.target.value } });
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (this.state.trip === undefined) {
      return;
    }
    this.props.bookTrip(this.state.trip.id, new Date(this.state.trip.day));
    this.setState({ submit: true, form: {} });
  }
}

/**
 * ===================
 * Redux Connect Props
 * ===================
 */

interface IReduxStateProps {
  trip(id: string, date: Date): ITrip | undefined;
}
interface IReduxDispatchProps {
  bookTrip(id: string, date: Date): void;
}
type ReduxProps = IReduxStateProps & IReduxDispatchProps;

const mapStateToProps: MapStateToProps<
  IReduxStateProps,
  {},
  IStoreState
> = state => ({
  trip: (id, date) => {
    const year = dateFns.format(date, 'YYYY');
    const month = dateFns.format(date, 'M');
    const day = dateFns.format(date, 'D');
    if (
      state.trips[year] === undefined ||
      state.trips[year][month] === undefined ||
      state.trips[year][month][day] === undefined
    ) {
      return undefined;
    }
    const trip = state.trips[year][month][day].find(t => t.id === id);
    if (trip === undefined) {
      return undefined;
    }
    const tripBoat = state.boats.find(boat => boat.id === trip.boat);
    if (tripBoat === undefined) {
      return undefined;
    }
    return { ...trip, boat: tripBoat };
  },
});

const mapDispatchToProps: MapDispatchToProps<
  IReduxDispatchProps,
  {}
> = dispatch => ({
  bookTrip: (id, date) => dispatch(actions.bookTrip(id, date)),
});

const ConnectedBooking = connect(mapStateToProps, mapDispatchToProps)(Booking);
export default ConnectedBooking;

/**
 * =================
 * Styled Components
 * =================
 */

interface IMessageProps {
  inProp: boolean;
}

const Styled = {
  Message: withProps<IMessageProps>()(styled.div),
};

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

  svg {
    background: white;
    fill: #bbb;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    order: -1;
    transition: fill 0.5s;
  }
`;
const Control = styled.input`
  &[type='text'],
  &[type='email'] {
    padding: 0.5rem;
    border: none;
    width: 100%;
  }
  &:focus ~ svg {
    fill: ${({ theme }) => theme.colors.black};
  }
`;

const Message = Styled.Message`
  transform: ${({ inProp }) =>
    inProp ? 'translate(-50%, 0)' : 'translate(-50%, 100%)'};
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
