import { PayloadAction, combineReducers } from '@reduxjs/toolkit';

import appReducer from './app/appSlice';
import themeReducer from './theme/themeSlice';
import trackersReducer from './trackers/trackersSlice';

const combinedReducer = combineReducers({
  trackers: trackersReducer,
  theme: themeReducer,
  app: appReducer
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: PayloadAction) => {
  let newState = state;
  if (action.type === 'app/createStoreFromJSON' && action.payload) {
    newState = JSON.parse(action.payload);
  }
  if (action.type === 'app/deleteStore') {
    newState = undefined;
  }
  return combinedReducer(newState, action);
};

export default rootReducer;
