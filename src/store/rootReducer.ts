import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import trackersReducer from './trackers/trackersSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  trackers: trackersReducer
});

export default rootReducer;
