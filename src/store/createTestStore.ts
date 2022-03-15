import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import trackersReducer from './trackers/trackersSlice';

export function createTestStore() {
  const store = configureStore({
    reducer: {
      counter: counterReducer,
      trackers: trackersReducer
    }
  });
  return store;
}
