import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'moment';
import styled from 'styled-components';

import View from './View';
import Day from './Day';
import Button from './Button';

// Moment object for today's date
const today = new Moment();

/**
 * Creates a mapped array of Day components
 * @param {Moment} calMoment - Current calendar Moment
 * @param {Object[]} scheduledDays - Days with scheduled trips
 * @returns {Object[]} Mapped array of Day components
 */
function daysInMonth(calMoment, scheduledDays) {
  const tempMoment = new Moment(calMoment).startOf('month').day(0);
  const days = [];
  for (let i = 0; i < 42; i += 1) {
    let status = '';
    if (calMoment.month() !== tempMoment.month()) status = 'inactive';
    else {
      const dayTrips = scheduledDays.find(
        day => day.date === tempMoment.format('YYYYMMDD'),
      );
      if (dayTrips) {
        if (dayTrips.booked === 0) status = 'open';
        else if (dayTrips.booked === dayTrips.trips.length) status = 'full';
        else status = 'partial';
      } else status = 'empty';
    }
    if (tempMoment.format('YYMMDD') === today.format('YYMMDD'))
      status = 'today';
    days.push(
      <Cell>
        <Day key={i} moment={new Moment(tempMoment)} status={status} />
      </Cell>,
    );
    tempMoment.add(1, 'days');
  }
  return days;
}

const Calendar = ({ calMoment, days, onControlClick, changeYear }) => (
  <View
    header={calMoment.format('MMMM YYYY')}
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
      <Days>{daysInMonth(calMoment, days)}</Days>
      <Footer>
        <Button
          isActive={calMoment.year() === today.year()}
          onClick={() => changeYear(today.year())}
        >
          {today.year()}
        </Button>
        <Button
          isActive={calMoment.year() === today.year() + 1}
          onClick={() => changeYear(today.year() + 1)}
        >
          {today.year() + 1}
        </Button>
        <Button
          isActive={calMoment.year() === today.year() + 2}
          onClick={() => changeYear(today.year() + 2)}
        >
          {today.year() + 2}
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
  calMoment: PropTypes.instanceOf(Moment).isRequired,
  days: PropTypes.arrayOf(PropTypes.object).isRequired,
  onControlClick: PropTypes.func.isRequired,
  changeYear: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  calMoment: state.calendar,
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
