import * as Recruiter from '../action-types/recruiterTypes';

export function recruiterReducer(state = [], action) {
  switch (action.type) {
    case Recruiter.SET_ALL_RECRUITERS:
      return [...action.payload];
    case Recruiter.ADD_RECRUITER:
      return [...state, action.payload];
    case Recruiter.EDIT_RECRUITER:
      return state.map(r => {
        if (r._id === action.payload._id) {
          return action.payload;
        }
        return r;
      });
    case Recruiter.DELETE_RECRUITER:
      return state.filter(r => r._id !== action.payload);
    default: return state;
  }
}
