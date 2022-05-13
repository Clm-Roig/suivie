import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackerStatus from '../../../models/TrackerStatus';
import TrackersState from '../TrackersState';
import { getTrackers } from './utils';

type PayloadType = {
  id: Tracker['id'];
  archiveDate?: Date;
};

const archiveTrackerReducer = (state: TrackersState, action: PayloadAction<PayloadType>) => {
  const { id, archiveDate } = action.payload;
  const idx = state.trackers.findIndex((t) => t.id === id);
  if (idx !== -1) {
    state.trackers[idx].endDate = (archiveDate ? archiveDate : new Date()).toString();
    state.trackers[idx].status = TrackerStatus.ARCHIVED;
  }
};

type MultiplePayloadType = {
  trackerIds: Array<Tracker['id']>;
  archiveDate?: Date;
};

const archiveTrackersReducer = (
  state: TrackersState,
  action: PayloadAction<MultiplePayloadType>
) => {
  const { trackerIds, archiveDate } = action.payload;
  const filteredTrackers = getTrackers(state, trackerIds);
  for (const tracker of filteredTrackers) {
    tracker.endDate = (archiveDate ? archiveDate : new Date()).toString();
    tracker.status = TrackerStatus.ARCHIVED;
  }
};

export { archiveTrackerReducer, archiveTrackersReducer };
