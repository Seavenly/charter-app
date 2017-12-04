interface IAction<T extends IPayload> {
  readonly type: ActionType;
  readonly payload?: T;
}
interface IPayload {
  readonly [index: string]: any;
}
interface INextMonthAction extends IAction<{}> {
  readonly type: ActionType.MONTH_UP;
}
interface IPrevMonthAction extends IAction<{}> {
  readonly type: ActionType.MONTH_DOWN;
}
interface ISetYearAction extends IAction<{ year: number }> {
  readonly type: ActionType.SET_YEAR;
  readonly payload: {
    readonly year: number;
  };
}
interface ISetDateAction extends IAction<{ date: Date }> {
  readonly type: ActionType.SET_DATE;
  readonly payload: {
    readonly date: Date;
  };
}
interface IBookTripAction extends IAction<{ id: string; date: Date }> {
  readonly type: ActionType.BOOK_TRIP;
  readonly payload: {
    readonly id: string;
    readonly date: Date;
  };
}
export type Action =
  | INextMonthAction
  | IPrevMonthAction
  | ISetYearAction
  | ISetDateAction
  | IBookTripAction;

export enum ActionType {
  // Calendar
  MONTH_UP = 'MONTH_UP',
  MONTH_DOWN = 'MONTH_DOWN',
  SET_YEAR = 'SET_YEAR',
  SET_DATE = 'SET_DATE',

  // Days & Trips
  BOOK_TRIP = 'BOOK_TRIP',
}

function nextMonth(): INextMonthAction {
  return {
    type: ActionType.MONTH_UP,
  };
}

function prevMonth(): IPrevMonthAction {
  return {
    type: ActionType.MONTH_DOWN,
  };
}

function setYear(year: number): ISetYearAction {
  return {
    type: ActionType.SET_YEAR,
    payload: {
      year,
    },
  };
}

function setDate(date: Date): ISetDateAction {
  return {
    type: ActionType.SET_DATE,
    payload: {
      date,
    },
  };
}

function bookTrip(id: string, date: Date): IBookTripAction {
  return {
    type: ActionType.BOOK_TRIP,
    payload: {
      id,
      date,
    },
  };
}

const actions = {
  nextMonth,
  prevMonth,
  setYear,
  setDate,
  bookTrip,
};

export default actions;
