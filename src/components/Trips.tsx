import React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import dateFns from 'date-fns';

import styled, { css, withProps } from '@src/styledComponents';
import { ITrip } from '@src/store/data/trips';
import { IStoreState } from '@src/store';
import actions from '@src/store/actions';
import View from '@src/components//View';
import Trip from '@src/components/Trip';
import Spinner from '@src/components/Spinner';

interface IRouteParams {
  /** Date to filter trips by passed as a param */
  date: string;
}
type Props = ReduxProps & RouteComponentProps<IRouteParams>;
interface IState {
  /** Number of Trip components with their image loaded */
  imagesLoaded: number;
  /** Flag to tell when all images have loaded */
  allLoaded: boolean;
  /** Trips in the form of JSX Elements */
  totalTrips: number | undefined;
}

class Trips extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      totalTrips: undefined,
      imagesLoaded: 0,
      allLoaded: false,
    };

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.availableTrips = this.availableTrips.bind(this);
  }

  public componentWillMount() {
    const [year, month, day] = this.props.match.params.date.split('-');
    const date = new Date(+year, +month - 1, +day);
    this.props.setDate(date);
    this.setState(() => ({
      totalTrips: this.availableTrips(date).length,
    }));
  }

  public render() {
    const { history, date } = this.props;
    return (
      /** @todo change back button to calendar url instead of history */
      <View
        header={dateFns.format(new Date(date), 'ddd, MMM D YYYY')}
        back={history.goBack}
      >
        {this.state.totalTrips ? (
          <List>{this.availableTrips(date)}</List>
        ) : (
          <Message>There are no available trips for this date.</Message>
        )}
        <Spinner
          isVisible={
            this.state.totalTrips !== undefined &&
            this.state.imagesLoaded < this.state.totalTrips
          }
        />
      </View>
    );
  }

  /** Callback function to update state that a Trip component has loaded its image */
  private handleImageLoaded() {
    this.setState(prevState => ({
      imagesLoaded: prevState.imagesLoaded + 1,
      allLoaded:
        prevState.totalTrips !== undefined &&
        prevState.imagesLoaded + 1 >= prevState.totalTrips,
    }));
  }

  /** Get non-booked trips for the day in the form of JSX Elements */
  private availableTrips(date: Date): JSX.Element[] {
    const trips = this.props.tripsOnDate(date);
    return trips.filter(trip => !trip.booked).map((trip, index) => (
      <Item
        key={trip.id}
        delay={0.5 - 0.3 / trips.length * index}
        allLoaded={this.state.allLoaded}
      >
        <Trip trip={trip} onLoaded={this.handleImageLoaded} />
      </Item>
    ));
  }
}

/**
 * ===================
 * Redux Connect Props
 * ===================
 */

interface IReduxStateProps {
  tripsOnDate: (date: Date) => ReadonlyArray<ITrip>;
  date: Date;
}
interface IReduxDispatchProps {
  setDate(date: Date): void;
}
type ReduxProps = IReduxStateProps & IReduxDispatchProps;

const mapStateToProps: MapStateToProps<
  IReduxStateProps,
  {},
  IStoreState
> = state => ({
  tripsOnDate: (date: Date): ReadonlyArray<ITrip> => {
    const year = dateFns.format(date, 'YYYY');
    const month = dateFns.format(date, 'M');
    const day = dateFns.format(date, 'D');
    if (
      state.trips[year] === undefined ||
      state.trips[year][month] === undefined ||
      state.trips[year][month][day] === undefined
    ) {
      return [];
    }
    const trips = state.trips[year][month][day];
    const populatedTrips = trips.map(trip => {
      const tripBoat = state.boats.find(boat => boat.id === trip.boat);
      return tripBoat === undefined ? trip : { ...trip, boat: tripBoat };
    });
    return populatedTrips;
  },
  date: state.calendar,
});

const mapPropstoDispatch: MapDispatchToProps<
  IReduxDispatchProps,
  {}
> = dispatch => ({
  setDate: date => dispatch(actions.setDate(date)),
});

export default connect(mapStateToProps, mapPropstoDispatch)(Trips);

/**
 * =================
 * Styled Components
 * =================
 */

interface IItemProps {
  allLoaded: boolean;
  delay: number;
}

const Styled = {
  Item: withProps<IItemProps>()(styled.li),
};

const Item = Styled.Item`
  ${({ allLoaded }) => css`
    opacity: ${allLoaded ? 1 : 0};
    transform: ${allLoaded ? 'translateY(0)' : 'translateY(-100%)'};
  `}
  transition: all 0.3s ${({ delay }) => delay}s;
  padding: 0.5rem;
  flex: 1 1 100%;
  max-width: 16rem;
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
