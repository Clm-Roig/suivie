import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackersState from '../TrackersState';

const cancelLatestEntryReducer = (state: TrackersState, action: PayloadAction<Tracker['id']>) => {
  const trackerFound = state.trackers.find((t) => t.id === action.payload);
  if (trackerFound) {
    trackerFound.entries.pop();
  }
};

export { cancelLatestEntryReducer };
