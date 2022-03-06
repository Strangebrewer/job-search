import * as Auth from '../action-types/authTypes';
import * as API from '../../api';
import { setAuthToken, resetAuthToken } from '../../utils/token';

export function getCurrentUser() {
  return async dispatch => {
    try {
      let { data } = await API.user.me();
      dispatch({ type: Auth.AUTHENTICATED });
      dispatch({ type: Auth.SET_CURRENT_USER, payload: data.user });
      return data;
    } catch (err) {
      console.log('err in authActions getCurrentUser:::', err);
      dispatch({ type: Auth.UNAUTHENTICATED });
    }
  }
}

export function signup(signup_data, history) {
  return async dispatch => {
    try {
      let response = await API.user.register(signup_data);
      setAuthToken(response.data.token);
      dispatch({ type: Auth.SET_CURRENT_USER, payload: response.data.user });
      dispatch({ type: Auth.AUTHENTICATED });
    } catch (err) {
      console.log('err in authActions signup:::', err);
      dispatch({
        type: Auth.SIGNUP_ERROR,
        payload: err.response.data.message
      });
    }
  }
}

export function login(credentials) {
  return async dispatch => {
    try {
      let { data } = await API.user.login(credentials);
      setAuthToken(data.token);
      dispatch({ type: Auth.SET_CURRENT_USER, payload: data.user });
      dispatch({ type: Auth.AUTHENTICATED });
    } catch (err) {
      console.log('err in authActions login:::', err);
      // dispatch({
      //   type: Auth.LOGIN_ERROR,
      //   payload: err.response.data.message
      // });
    }
  }
}

export function logout() {
  return dispatch => {
    resetAuthToken();
    dispatch({ type: Auth.UNAUTHENTICATED });
    dispatch({ type: Auth.LOGOUT });
  }
}

export function updateUser(data) {
  return async dispatch => {
    try {
      let response = await API.user.update(data);
      setAuthToken(response.data.token);
      dispatch({ type: Auth.SET_CURRENT_USER, payload: response.data.user });
      return response.data.user;
    } catch (err) {
      console.log('err in authActions updateUser:::', err);
      dispatch({
        type: Auth.UPDATE_ERROR,
        payload: err.response.data.message
      });
    }
  }
}

export function setError(errorMsg, errorType) {
  let type;
  if (errorType === 'signup') type = Auth.SIGNUP_ERROR;
  if (errorType === 'login') type = Auth.LOGIN_ERROR;
  if (errorType === 'update') type = Auth.UPDATE_ERROR;
  return dispatch => {
    dispatch({ type, payload: errorMsg })
  }
}

export function clearError() {
  return dispatch => {
    dispatch({ type: Auth.CLEAR_ERROR })
  }
}