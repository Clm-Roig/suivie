import { Action, combineReducers } from '@reduxjs/toolkit';

import appReducer from './app/appSlice';
import themeReducer from './theme/themeSlice';
import trackersReducer from './trackers/trackersSlice';

const combinedReducer = combineReducers({
  trackers: trackersReducer,
  theme: themeReducer,
  app: appReducer
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: Action) =>
  combinedReducer(action.type === 'app/deleteStore' ? undefined : state, action);

export default rootReducer;
