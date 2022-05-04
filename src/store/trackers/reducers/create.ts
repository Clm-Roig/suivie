import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackersState from '../TrackersState';

const createTrackerReducer = (state: TrackersState, action: PayloadAction<Tracker>) => {
  state.trackers.unshift(action.payload);
};

export { createTrackerReducer };
