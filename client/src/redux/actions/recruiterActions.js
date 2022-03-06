import * as Recruiter from '../action-types/recruiterTypes';
import * as API from '../../api';

export function getRecruiters(query) {
  return async dispatch => {
    try {
      const { data } = await API.recruiter.list(query);
      console.log('data:::', data);
      dispatch({ type: Recruiter.SET_ALL_RECRUITERS, payload: data });
    } catch (err) {
      console.log('err in getRecruiters action:::', err);
    }
  }
}

export function saveRecruiter(recruiter) {
  console.log('saving this recruiter:::', recruiter);
  return async dispatch => {
    try {
      let data;
      if (recruiter._id) {
        ({ data } = await API.recruiter.update(recruiter));
        dispatch({ type: Recruiter.EDIT_RECRUITER, payload: data });
      } else {
        ({ data } = await API.recruiter.create(recruiter));
        dispatch({ type: Recruiter.ADD_RECRUITER, payload: data });
      }
      return data;
    } catch (err) {
      console.log('err in saveRecruiter action:::', err);
    }
  }
}

export function deleteRecruiter(id) {
  return async dispatch => {
    try {
      const { data } = await API.recruiter.delete(id);
      dispatch({ type: Recruiter.DELETE_RECRUITER, payload: id });
      return data;
    } catch (err) {
      console.log('err in deleteRecruiter action:::', err);
    }
  }
}
