import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackersState from '../TrackersState';

const hideTrackerReducer = (state: TrackersState, action: PayloadAction<Tracker['id']>) => {
  const idx = state.trackers.findIndex((t) => t.id === action.payload);
  if (idx !== -1) {
    state.trackers[idx].dateHidden = new Date().toString();
  }
};

export { hideTrackerReducer };
