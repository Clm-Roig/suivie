import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackersState from '../TrackersState';

const markTrackerAsVisibleReducer = (
  state: TrackersState,
  action: PayloadAction<Tracker['id']>
) => {
  const idx = state.trackers.findIndex((t) => t.id === action.payload);
  if (idx !== -1) {
    state.trackers[idx].dateHidden = undefined;
  }
};
export { markTrackerAsVisibleReducer };
