import boatsData from '../data/boats.json';

function boatsReducer(boats = boatsData, action) {
  switch (action.type) {
    default:
      return boats;
  }
}

export default boatsReducer;
