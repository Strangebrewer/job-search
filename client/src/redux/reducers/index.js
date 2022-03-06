import { combineReducers } from 'redux';

import { authReducer, userReducer } from './authReducer';
import { recruiterReducer } from './recruiterReducer';
import { jobReducer } from './jobReducer';

import { UNAUTHENTICATED } from '../action-types/authTypes';

const appReducer = combineReducers({
  // auth
  auth: authReducer,
  user: userReducer,

  // other stuff
  jobs: jobReducer,
  recruiters: recruiterReducer,
});

const rootReducer = (state, action) => {
  if (action.type === UNAUTHENTICATED) {
     state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;
