import Moment from 'moment';

const MONTH_UP = 'MONTH_UP';
const MONTH_DOWN = 'MONTH_DOWN';
const CHANGE_YEAR = 'CHANGE_YEAR';
const SET_DAY = 'SET_DAY';

function calendarReducer(moment = new Moment('2017-09-15'), action) {
  switch (action.type) {
    case MONTH_DOWN:
      return new Moment(moment).subtract(1, 'months');
    case MONTH_UP:
      return new Moment(moment).add(1, 'months');
    case CHANGE_YEAR:
      return new Moment(moment).set('year', action.year);
    case SET_DAY:
      return new Moment(action.moment);
    default:
      return moment;
  }
}

export default calendarReducer;
