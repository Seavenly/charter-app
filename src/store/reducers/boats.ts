import boatsData, { IBoat } from '../data/boats';
import { Action } from '../actions';

function boatsReducer(
  boats: ReadonlyArray<IBoat> = boatsData,
  action: Action,
): ReadonlyArray<IBoat> {
  switch (action.type) {
    default:
      return boats;
  }
}

export default boatsReducer;
