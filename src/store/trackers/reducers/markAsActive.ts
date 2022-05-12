import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackerStatus from '../../../models/TrackerStatus';
import TrackersState from '../TrackersState';
import { getTrackers } from './utils';

/* eslint-disable no-param-reassign */
const markTrackerAsActive = (tracker: Tracker) => {
  tracker.endDate = undefined;
  tracker.status = TrackerStatus.active;
};
/* eslint-enable no-param-reassign */

const markTrackerAsActiveReducer = (state: TrackersState, action: PayloadAction<Tracker['id']>) => {
  const idx = state.trackers.findIndex((t) => t.id === action.payload);
  if (idx !== -1) {
    markTrackerAsActive(state.trackers[idx]);
  }
};
const markTrackersAsActiveReducer = (
  state: TrackersState,
  action: PayloadAction<Array<Tracker['id']>>
) => {
  const filteredTrackers = getTrackers(state, action.payload);
  for (const tracker of filteredTrackers) {
    markTrackerAsActive(tracker);
  }
};

export { markTrackerAsActiveReducer, markTrackersAsActiveReducer };
