import * as Job from '../action-types/jobTypes';
import * as API from '../../api';

export function getJobs(query) {
  return async dispatch => {
    try {
      const { data } = await API.job.list(query);
      dispatch({ type: Job.SET_ALL_JOBS, payload: data });
    } catch (err) {
      console.log('err in getJobs action:::', err);
    }
  }
}

export function saveJob(recruiter) {
  return async dispatch => {
    try {
      let data;
      if (recruiter._id) {
        ({ data } = await API.job.update(recruiter));
        dispatch({ type: Job.EDIT_JOB, payload: data });
      } else {
        ({ data } = await API.job.create(recruiter));
        dispatch({ type: Job.ADD_JOB, payload: data });
      }
      return data;
    } catch (err) {
      console.log('err in saveJob action:::', err);
    }
  }
}

export function deleteJob(id) {
  return async dispatch => {
    try {
      const { data } = await API.job.delete(id);
      dispatch({ type: Job.DELETE_JOB, payload: id });
      return data;
    } catch (err) {
      console.log('err in deleteJob action:::', err);
    }
  }
}
