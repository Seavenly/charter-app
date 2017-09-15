import daysData from '../data/days.json';

const BOOK_TRIP = 'BOOK_TRIP';

function daysReducer(days = daysData, action) {
  switch (action.type) {
    case BOOK_TRIP:
    {
      const newDays = [...days];
      const tripDay = newDays.find(day => day.date === action.day);
      const index = newDays.indexOf(tripDay);
      newDays[index] = { ...tripDay, booked: tripDay.booked + 1 };
      return newDays;
    }
    default:
      return days;
  }
}

export default daysReducer;
