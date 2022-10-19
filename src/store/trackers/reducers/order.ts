import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackersState from '../TrackersState';

const orderTrackerReducer = (state: TrackersState, action: PayloadAction<Tracker[]>) => {
  const trackers = action.payload;
  state.trackers = trackers;
};

export { orderTrackerReducer };
