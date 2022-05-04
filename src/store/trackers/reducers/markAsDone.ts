import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackerStatus from '../../../models/TrackerStatus';
import TrackersState from '../TrackersState';

const markTrackerAsDoneReducer = (state: TrackersState, action: PayloadAction<Tracker['id']>) => {
  const idx = state.trackers.findIndex((t) => t.id === action.payload);
  if (idx !== -1) {
    state.trackers[idx].endDate = new Date().toString();
    state.trackers[idx].status = TrackerStatus.done;
  }
};
const markTrackersAsDoneReducer = (
  state: TrackersState,
  action: PayloadAction<Array<Tracker['id']>>
) => {
  const filteredTrackers = state.trackers.filter((t) => action.payload.includes(t.id));
  for (const tracker of filteredTrackers) {
    tracker.endDate = new Date().toString();
    tracker.status = TrackerStatus.done;
  }
};
export { markTrackerAsDoneReducer, markTrackersAsDoneReducer };
