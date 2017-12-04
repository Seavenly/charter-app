import dateFns from 'date-fns';

import { Action, ActionType } from '../actions';

function calendarReducer(
  date: Date = new Date(2017, 8, 12),
  action: Action,
): Date {
  switch (action.type) {
    case ActionType.MONTH_DOWN:
      return dateFns.subMonths(date, 1);

    case ActionType.MONTH_UP:
      return dateFns.addMonths(date, 1);

    case ActionType.SET_YEAR:
      return dateFns.setYear(date, action.payload.year);

    case ActionType.SET_DATE:
      return new Date(action.payload.date);

    default:
      return date;
  }
}

export default calendarReducer;
