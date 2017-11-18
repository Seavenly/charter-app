import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import styled from 'styled-components';

import View from './View';
import Day from './Day';
import Button from './Button';

const today = new Date();

/**
 * Creates a mapped array of Day components
 * @param {Date} calDate - Current calendar Date
 * @param {Object[]} scheduledDays - Days with scheduled trips
 * @returns {Object[]} Mapped array of Day components
 */
function daysInMonth(calDate, scheduledDays) {
  // Get first day of the week for current Month
  let tempDate = dateFns.setDay(dateFns.startOfMonth(calDate), 0);
  // Store each Day component.
  const days = [];
  // Used inside of for loop.
  const compareDate = day => day.date === dateFns.format(tempDate, 'YYYYMMDD');
  for (let i = 0; i < 42; i += 1) {
    // Status of current iteration date for Day component
    let status = '';
    if (dateFns.getMonth(calDate) !== dateFns.getMonth(tempDate))
      // If current iteration date is outside of current month
      status = 'inactive';
    else {
      // Find trip date from current iteration date.
      // Returns object
      const dayTrips = scheduledDays.find(compareDate);
      if (dayTrips) {
        if (dayTrips.booked === 0) status = 'open';
        else if (dayTrips.booked === dayTrips.trips.length) status = 'full';
        else status = 'partial';
      } else status = 'empty';
    }
    if (dateFns.format(tempDate, 'YYMMDD') === dateFns.format(today, 'YYMMDD'))
      // Current iteration date matches today's date
      status = 'today';
    days.push(
      <Cell key={i}>
        <Day date={tempDate} status={status} />
      </Cell>,
    );
    // Set next day
    tempDate = dateFns.addDays(tempDate, 1);
  }
  return days;
}

const Calendar = ({ calDate, days, onControlClick, changeYear }) => (
  <View
    header={dateFns.format(calDate, 'MMMM YYYY')}
    back={() => onControlClick('LEFT')}
    forward={() => onControlClick('RIGHT')}
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
      <Days>{daysInMonth(calDate, days)}</Days>
      <Footer>
        <Button
          isActive={dateFns.getYear(calDate) === dateFns.getYear(today)}
          onClick={() => changeYear(dateFns.getYear(today))}
        >
          {dateFns.getYear(today)}
        </Button>
        <Button
          isActive={dateFns.getYear(calDate) === dateFns.getYear(today) + 1}
          onClick={() => changeYear(dateFns.getYear(today) + 1)}
        >
          {dateFns.getYear(today) + 1}
        </Button>
        <Button
          isActive={dateFns.getYear(calDate) === dateFns.getYear(today) + 2}
          onClick={() => changeYear(dateFns.getYear(today) + 2)}
        >
          {dateFns.getYear(today) + 2}
        </Button>
      </Footer>
      <Legend>
        <Key>
          <Color kind="today" />Today
        </Key>
        <Key>
          <Color kind="open" />All available
        </Key>
        <Key>
          <Color kind="partial" />Some available
        </Key>
        <Key>
          <Color kind="full" />All booked
        </Key>
        <Key>
          <Color kind="empty" />No trips
        </Key>
      </Legend>
    </div>
  </View>
);

Calendar.propTypes = {
  calDate: PropTypes.instanceOf(Date).isRequired,
  days: PropTypes.arrayOf(PropTypes.object).isRequired,
  onControlClick: PropTypes.func.isRequired,
  changeYear: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  calDate: state.calendar,
  days: state.days,
});
const mapDispatchToProps = dispatch => ({
  onControlClick: direction => {
    if (direction === 'LEFT') dispatch({ type: 'MONTH_DOWN' });
    else if (direction === 'RIGHT') dispatch({ type: 'MONTH_UP' });
  },
  changeYear: year => {
    dispatch({ type: 'CHANGE_YEAR', year });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

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

const Color = styled.span`
  background: ${({ theme, kind }) => {
    switch (kind) {
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
