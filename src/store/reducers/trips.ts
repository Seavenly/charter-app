import tripsData, { ITripsData, ITrip } from '../data/trips';
import { Action, ActionType } from '../actions';

function tripsReducer(
  trips: ITripsData = tripsData,
  action: Action,
): ITripsData {
  switch (action.type) {
    case ActionType.BOOK_TRIP: {
      const id: string = action.payload.id;
      const year: string = `${action.payload.date.getFullYear()}`;
      const month: string = `${action.payload.date.getMonth() + 1}`;
      const day: string = `${action.payload.date.getDate()}`;
      const index: number = trips[year][month][day].findIndex(t => t.id === id);
      if (index === -1) {
        return trips;
      }
      const bookedTrip: ITrip = {
        ...trips[year][month][day][index],
        booked: true,
      };
      return {
        ...trips,
        [year]: {
          ...trips[year],
          [month]: {
            ...trips[year][month],
            [day]: [
              ...trips[year][month][day].slice(0, index),
              bookedTrip,
              ...trips[year][month][day].slice(index + 1),
            ],
          },
        },
      };
      // return [...trips.slice(0, index), bookedTrip, ...trips.slice(index + 1)];
    }

    default:
      return trips;
  }
}

export default tripsReducer;
