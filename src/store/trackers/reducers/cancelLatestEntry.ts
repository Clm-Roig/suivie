import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackersState from '../TrackersState';

const cancelLatestEntryReducer = (state: TrackersState, action: PayloadAction<Tracker['id']>) => {
  const trackerFound = state.trackers.find((t) => t.id === action.payload);
  if (trackerFound) {
    trackerFound.entries
      .sort((e1, e2) => new Date(e1.date).getTime() - new Date(e2.date).getTime())
      .pop();
  }
};

export { cancelLatestEntryReducer };
