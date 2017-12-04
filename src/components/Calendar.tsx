import React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import dateFns from 'date-fns';

import styled, { withProps } from '@src/styledComponents';
import { IStoreState } from '@src/store';
import { ITrip, ITripsData } from '@src/store/data/trips';
import actions from '@src/store/actions';
import View from '@src/components/View';
import Day from '@src/components/Day';
import Button from '@src/components/Button';

const today = new Date();

/** Creates a mapped array of Day components  */
function createDaysInMonth(calDate: Date, trips: ITripsData): JSX.Element[] {
  // Get first day of the week for current Month
  const startDate: Date = dateFns.setDay(dateFns.startOfMonth(calDate), 0);
  const endDate: Date = dateFns.addDays(startDate, 41);
  // Store each Day component.
  const days: JSX.Element[] = [];
  dateFns.eachDay(startDate, endDate).map(tempDate => {
    const year: string = `${tempDate.getFullYear()}`;
    const month: string = `${tempDate.getMonth() + 1}`;
    const day: string = `${tempDate.getDate()}`;
    // Status of current iteration date for Day component
    let status = 'inactive';
    if (dateFns.getMonth(calDate) === dateFns.getMonth(tempDate)) {
      if (
        trips[year] === undefined ||
        trips[year][month] === undefined ||
        trips[year][month][day] === undefined
      ) {
        status = 'empty';
      } else {
        // Find trip date from current iteration date.
        // Returns object
        const dayTrips: ReadonlyArray<ITrip> = trips[year][month][day];
        if (dayTrips.length) {
          const booked: number = dayTrips.reduce(
            (total, current) => total + (current.booked ? 1 : 0),
            0,
          );
          if (booked === 0) {
            status = 'open';
          } else if (booked === dayTrips.length) {
            status = 'full';
          } else {
            status = 'partial';
          }
        } else {
          status = 'empty';
        }
      }
      if (
        dateFns.format(tempDate, 'YYMMDD') === dateFns.format(today, 'YYMMDD')
      ) {
        status = 'today';
      }
    }
    days.push(
      <Cell key={tempDate.toISOString()}>
        <Day date={tempDate} status={status} />
      </Cell>,
    );
  });
  return days;
}

type Props = ReduxProps;
const Calendar: React.StatelessComponent<Props> = ({
  calDate,
  trips,
  onControlClick,
  changeYear,
}) => (
  <View
    header={dateFns.format(calDate, 'MMMM YYYY')}
    back={onControlClick('LEFT')}
    forward={onControlClick('RIGHT')}
  >
    <div>
      <Weeks>
        <Cell>Sun</Cell>
        <Cell>Mon</Cell>
        <Cell>Tue</Cell>
        <Cell>Wed</Cell>
        <Cell>Thu</Cell>
        <Cell>Fri</Cell>
        <Cell>Sat</Cell>
      </Weeks>
      <Days>{createDaysInMonth(calDate, trips)}</Days>
      <Footer>
        <Button
          isActive={dateFns.getYear(calDate) === dateFns.getYear(today)}
          onClick={changeYear(dateFns.getYear(today))}
        >
          {dateFns.getYear(today)}
        </Button>
        <Button
          isActive={dateFns.getYear(calDate) === dateFns.getYear(today) + 1}
          onClick={changeYear(dateFns.getYear(today) + 1)}
        >
          {dateFns.getYear(today) + 1}
        </Button>
        <Button
          isActive={dateFns.getYear(calDate) === dateFns.getYear(today) + 2}
          onClick={changeYear(dateFns.getYear(today) + 2)}
        >
          {dateFns.getYear(today) + 2}
        </Button>
      </Footer>
      <Legend>
        <Key>
          <Color tag="today" />Today
        </Key>
        <Key>
          <Color tag="open" />All available
        </Key>
        <Key>
          <Color tag="partial" />Some available
        </Key>
        <Key>
          <Color tag="full" />All booked
        </Key>
        <Key>
          <Color tag="empty" />No trips
        </Key>
      </Legend>
    </div>
  </View>
);

/**
 * ===================
 * Redux Connect Props
 * ===================
 */

interface IReduxStateProps {
  calDate: Date;
  trips: ITripsData;
}
interface IReduxDispatchProps {
  onControlClick: (direction: string) => () => void;
  changeYear: (year: number) => () => void;
}
type ReduxProps = IReduxStateProps & IReduxDispatchProps;

const mapStateToProps: MapStateToProps<
  IReduxStateProps,
  {},
  IStoreState
> = state => ({
  calDate: state.calendar,
  trips: state.trips,
});
const mapDispatchToProps: MapDispatchToProps<
  IReduxDispatchProps,
  {}
> = dispatch => ({
  onControlClick: (direction: string): (() => void) => {
    if (direction === 'LEFT') {
      return () => dispatch(actions.prevMonth());
    }
    return () => dispatch(actions.nextMonth());
  },
  changeYear: (year: number): (() => void) => {
    return () => dispatch(actions.setYear(year));
  },
});

const ConnectedCalendar = connect(mapStateToProps, mapDispatchToProps)(
  Calendar,
);
export default ConnectedCalendar;

/**
 * =================
 * Styled Components
 * =================
 */

interface IColorProps {
  tag: string;
}
const Styled = {
  Color: withProps<IColorProps>()(styled.span),
};

const Weeks = styled.div`
  margin: 0 5% 1rem;
  display: flex;
  flex-wrap: wrap;
`;
const Days = styled.div`
  margin: 0 5% 2rem;
  display: flex;
  flex-wrap: wrap;
`;
const Cell = styled.div`
  flex: 1 1 14.28571428571429%;
  position: relative;
  z-index: 2;
`;
const Legend = styled.div`
  background: white;
  padding-top: 1rem;
`;
const Key = styled.div`
  display: inline-block;
  margin: 0.3rem 1rem;
`;
const Footer = styled.div`
  background: ${({ theme }) => theme.colors.today};
  padding: 0.6rem 0;
  box-shadow: 0 -0.2rem #ddd;
  border-radius: 0 0 0.2rem 0.2rem;
  > div {
    display: inline-block;
    margin: 0 0.5rem;
  }
`;

const Color = Styled.Color`
  background: ${({ theme, tag }) => {
    switch (tag) {
      case 'today':
        return theme.colors.today;
      case 'open':
        return theme.colors.open;
      case 'partial':
        return theme.colors.partial;
      case 'full':
        return theme.colors.full;
      case 'empty':
        return theme.colors.empty;
      default:
        return 'none';
    }
  }};
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 0.2rem;
  margin-right: 0.5rem;
`;
