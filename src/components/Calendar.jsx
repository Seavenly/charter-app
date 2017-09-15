import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'moment';

import Day from './Day';

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
      const dayTrips = scheduledDays.find(day => day.date === tempMoment.format('YYYYMMDD'));
      if (dayTrips) {
        if (dayTrips.booked === 0) status = 'open';
        else if (dayTrips.booked === dayTrips.trips.length) status = 'full';
        else status = 'partial';
      } else status = 'empty';
    }
    if (tempMoment.format('YYMMDD') === today.format('YYMMDD')) status = `${status} today`;
    days.push(
      <Day
        key={i}
        moment={new Moment(tempMoment)}
        status={status}
      />,
    );
    tempMoment.add(1, 'days');
  }
  return days;
}

const Calendar = ({ calMoment, days, onControlClick, changeYear }) => (
  <div className="calendar view">
    <div className="header">
      <div className="control">
        <button onClick={() => onControlClick('LEFT')}><i className="material-icons">arrow_back</i></button>
      </div>
      <div className="heading"><h2>{ calMoment.format('MMMM YYYY') }</h2></div>
      <div className="control">
        <button onClick={() => onControlClick('RIGHT')}><i className="material-icons">arrow_forward</i></button>
      </div>
    </div>
    <div className="body transition">
      <div className="cal-weeks">
        <div className="cell">Sun</div>
        <div className="cell">Mon</div>
        <div className="cell">Tue</div>
        <div className="cell">Wed</div>
        <div className="cell">Thu</div>
        <div className="cell">Fri</div>
        <div className="cell">Sat</div>
      </div>
      <div className="cal-days">
        { daysInMonth(calMoment, days) }
      </div>
      <div className="footer">
        <ul>
          <li className="control">
            <button className={calMoment.year() === today.year() ? 'active' : ''} onClick={() => changeYear(today.year())}>{today.year()}</button>
          </li>
          <li className="control">
            <button className={calMoment.year() === today.year() + 1 ? 'active' : ''} onClick={() => changeYear(today.year() + 1)}>{today.year() + 1}</button>
          </li>
          <li className="control">
            <button className={calMoment.year() === today.year() + 2 ? 'active' : ''} onClick={() => changeYear(today.year() + 2)}>{today.year() + 2}</button>
          </li>
        </ul>
      </div>
      <div className="legend">
        <div className="key"><span className="color today" /><span className="name">Today</span></div>
        <div className="key"><span className="color open" /><span className="name">All available</span></div>
        <div className="key"><span className="color partial" /><span className="name">Some available</span></div>
        <div className="key"><span className="color full" /><span className="name">All booked</span></div>
        <div className="key"><span className="color empty" /><span className="name">No trips</span></div>
      </div>
    </div>
  </div>
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
  onControlClick: (direction) => {
    if (direction === 'LEFT') dispatch({ type: 'MONTH_DOWN' });
    else if (direction === 'RIGHT') dispatch({ type: 'MONTH_UP' });
  },
  changeYear: (year) => {
    dispatch({ type: 'CHANGE_YEAR', year });
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar);
