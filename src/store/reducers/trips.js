import tripsData from '../data/trips.json';

const BOOK_TRIP = 'BOOK_TRIP';

function tripsReducer(trips = tripsData, action) {
  switch (action.type) {
    case BOOK_TRIP:
    {
      const index = trips.findIndex(t => t.id === action.id);
      const bookedTrip = { ...trips[index], booked: true };
      return [
        ...trips.slice(0, index),
        bookedTrip,
        ...trips.slice(index + 1),
      ];
    }
    default:
      return trips;
  }
}

export default tripsReducer;
