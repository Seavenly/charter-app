import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'moment';

import View from './View';
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
    if (tempMoment.format('YYMMDD') === today.format('YYMMDD')) status = `${status} day--today`;
    days.push(
      <div className="calendar__cell">
        <Day key={i} moment={new Moment(tempMoment)} status={status} />
      </div>,
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
    <div className="calendar">
      <div className="calendar__weeks">
        <div className="calendar__cell">Sun</div>
        <div className="calendar__cell">Mon</div>
        <div className="calendar__cell">Tue</div>
        <div className="calendar__cell">Wed</div>
        <div className="calendar__cell">Thu</div>
        <div className="calendar__cell">Fri</div>
        <div className="calendar__cell">Sat</div>
      </div>
      <div className="calendar__days">{daysInMonth(calMoment, days)}</div>
      <div className="calendar__footer">
        <ul>
          <li className="control">
            <button
              className={`control__btn ${
                calMoment.year() === today.year() ? 'control__btn--active' : ''
              }`}
              onClick={() => changeYear(today.year())}
            >
              {today.year()}
            </button>
          </li>
          <li className="control">
            <button
              className={`control__btn ${
                calMoment.year() === today.year() + 1 ? 'control__btn--active' : ''
              }`}
              onClick={() => changeYear(today.year() + 1)}
            >
              {today.year() + 1}
            </button>
          </li>
          <li className="control">
            <button
              className={`control__btn ${
                calMoment.year() === today.year() + 2 ? 'control__btn--active' : ''
              }`}
              onClick={() => changeYear(today.year() + 2)}
            >
              {today.year() + 2}
            </button>
          </li>
        </ul>
      </div>
      <div className="calendar__legend">
        <div className="calendar__key">
          <span className="color color--today" />Today
        </div>
        <div className="calendar__key">
          <span className="color color--open" />All available
        </div>
        <div className="calendar__key">
          <span className="color color--partial" />Some available
        </div>
        <div className="calendar__key">
          <span className="color color--full" />All booked
        </div>
        <div className="calendar__key">
          <span className="color color--empty" />No trips
        </div>
      </div>
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
