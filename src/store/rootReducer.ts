import { combineReducers } from '@reduxjs/toolkit';

import trackersReducer from './trackers/trackersSlice';

const rootReducer = combineReducers({
  trackers: trackersReducer
});

export default rootReducer;
