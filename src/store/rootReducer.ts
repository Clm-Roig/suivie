import { combineReducers } from '@reduxjs/toolkit';

import themeReducer from './theme/themeSlice';
import trackersReducer from './trackers/trackersSlice';

const rootReducer = combineReducers({
  trackers: trackersReducer,
  theme: themeReducer
});

export default rootReducer;
