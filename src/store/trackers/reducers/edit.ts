import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackersState from '../TrackersState';

const editTrackerReducer = (state: TrackersState, action: PayloadAction<Tracker>) => {
  const idx = state.trackers.findIndex((t) => t.id === action.payload.id);
  if (idx !== -1) {
    state.trackers[idx] = action.payload;
  }
};

export { editTrackerReducer };
