import { PayloadAction } from '@reduxjs/toolkit';

import TrackersState from '../TrackersState';
import { TrackerIdAndDate } from './types';

const hideTrackerReducer = (state: TrackersState, action: PayloadAction<TrackerIdAndDate>) => {
  const { id, date } = action.payload;
  const idx = state.trackers.findIndex((t) => t.id === id);
  if (idx !== -1) {
    state.trackers[idx].dateHidden = (date ? date : new Date()).toString();
  }
};

export { hideTrackerReducer };
