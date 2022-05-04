import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackerStatus from '../../../models/TrackerStatus';
import TrackersState from '../TrackersState';

/* eslint-disable no-param-reassign */
const markTrackerAsDone = (tracker: Tracker) => {
  tracker.endDate = new Date().toString();
  tracker.status = TrackerStatus.done;
};
/* eslint-enable no-param-reassign */

const markTrackerAsDoneReducer = (state: TrackersState, action: PayloadAction<Tracker['id']>) => {
  const idx = state.trackers.findIndex((t) => t.id === action.payload);
  if (idx !== -1) {
    markTrackerAsDone(state.trackers[idx]);
  }
};
const markTrackersAsDoneReducer = (
  state: TrackersState,
  action: PayloadAction<Array<Tracker['id']>>
) => {
  const filteredTrackers = state.trackers.filter((t) => action.payload.includes(t.id));
  for (const tracker of filteredTrackers) {
    markTrackerAsDone(tracker);
  }
};
export { markTrackerAsDoneReducer, markTrackersAsDoneReducer };
