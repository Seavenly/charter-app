import { createStore, combineReducers } from 'redux';

import { ITripsData } from './data/trips';
import { IBoat } from './data/boats';
import boats from './reducers/boats';
import calendar from './reducers/calendar';
import trips from './reducers/trips';

export interface IStoreState {
  readonly calendar: Date;
  readonly boats: ReadonlyArray<IBoat>;
  readonly trips: ITripsData;
}

const rootReducer = combineReducers<IStoreState>({
  boats,
  calendar,
  trips,
});

export default createStore<IStoreState>(rootReducer);
