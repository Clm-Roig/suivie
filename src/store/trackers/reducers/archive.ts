import { PayloadAction } from '@reduxjs/toolkit';

import TrackerStatus from '../../../models/TrackerStatus';
import TrackersState from '../TrackersState';
import { MultipleTrackerIdsAndDate, TrackerIdAndDate } from './types';
import { getTrackers } from './utils';

const archiveTrackerReducer = (state: TrackersState, action: PayloadAction<TrackerIdAndDate>) => {
  const { id, date } = action.payload;
  const idx = state.trackers.findIndex((t) => t.id === id);
  if (idx !== -1) {
<<<<<<< develop
    state.trackers[idx].endDate = (archiveDate ? archiveDate : new Date()).toString();
    state.trackers[idx].status = TrackerStatus.ARCHIVED;
=======
    state.trackers[idx].endDate = (date ? date : new Date()).toString();
    state.trackers[idx].status = TrackerStatus.archived;
>>>>>>> refactor(payloadType): refactor tracker action payload
  }
};

const archiveTrackersReducer = (
  state: TrackersState,
  action: PayloadAction<MultipleTrackerIdsAndDate>
) => {
  const { trackerIds, date } = action.payload;
  const filteredTrackers = getTrackers(state, trackerIds);
  for (const tracker of filteredTrackers) {
    tracker.endDate = (date ? date : new Date()).toString();
    tracker.status = TrackerStatus.ARCHIVED;
  }
};

export { archiveTrackerReducer, archiveTrackersReducer };
