// import daysData from '../data/days.json';
// import { Action, ActionType } from '../actions';

// function daysReducer(days = daysData, action: Action) {
//   switch (action.type) {
//     case ActionType.BOOK_TRIP: {
//       const day = action.payload.day;
//       const newDays = [...days];
//       const tripDay = newDays.find(d => d.date === day);
//       const index = newDays.indexOf(tripDay);
//       newDays[index] = { ...tripDay, booked: tripDay.booked + 1 };
//       return newDays;
//     }

//     default:
//       return days;
//   }
// }

// export default daysReducer;
