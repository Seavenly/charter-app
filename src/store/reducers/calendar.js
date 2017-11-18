import dateFns from 'date-fns';

const MONTH_UP = 'MONTH_UP';
const MONTH_DOWN = 'MONTH_DOWN';
const CHANGE_YEAR = 'CHANGE_YEAR';
const SET_DAY = 'SET_DAY';

function calendarReducer(date = new Date(2017, 8, 15), action) {
  switch (action.type) {
    case MONTH_DOWN:
      return dateFns.subMonths(date, 1);
    case MONTH_UP:
      return dateFns.addMonths(date, 1);
    case CHANGE_YEAR:
      return dateFns.setYear(date, action.year);
    case SET_DAY:
      return dateFns.setDate(date, action.date);
    default:
      return date;
  }
}

export default calendarReducer;
