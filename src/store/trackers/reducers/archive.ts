import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackerStatus from '../../../models/TrackerStatus';
import TrackersState from '../TrackersState';
import { getTrackers } from './utils';

const archiveTrackerReducer = (state: TrackersState, action: PayloadAction<Tracker['id']>) => {
  const idx = state.trackers.findIndex((t) => t.id === action.payload);
  if (idx !== -1) {
    state.trackers[idx].endDate = new Date().toString();
    state.trackers[idx].status = TrackerStatus.ARCHIVED;
  }
};

const archiveTrackersReducer = (
  state: TrackersState,
  action: PayloadAction<Array<Tracker['id']>>
) => {
  const filteredTrackers = getTrackers(state, action.payload);
  for (const tracker of filteredTrackers) {
    tracker.endDate = new Date().toString();
    tracker.status = TrackerStatus.ARCHIVED;
  }
};

export { archiveTrackerReducer, archiveTrackersReducer };
