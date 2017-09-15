import { createStore, combineReducers } from 'redux';

import boats from './reducers/boats';
import calendar from './reducers/calendar';
import days from './reducers/days';
import trips from './reducers/trips';

const reducer = combineReducers({ boats, calendar, days, trips });

export default createStore(reducer);
