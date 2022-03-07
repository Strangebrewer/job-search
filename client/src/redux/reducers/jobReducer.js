import * as Job from '../action-types/jobTypes';

export function jobReducer(state = [], action) {
  switch (action.type) {
    case Job.SET_ALL_JOBS:
      return action.payload;
    // case Job.SET_CURRENT_JOB:
    //   return action.payload;
    case Job.ADD_JOB:
      return [...state, action.payload];
    case Job.EDIT_JOB:
      return state.map(r => {
        if (r._id === action.payload._id) {
          return action.payload;
        }
        return r;
      });
    case Job.DELETE_JOB:
      return state.filter(r => r._id !== action.payload);
    default: return state;
  }
}