import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackerStatus from '../../../models/TrackerStatus';
import TrackersState from '../TrackersState';

const unarchiveTrackersReducer = (
  state: TrackersState,
  action: PayloadAction<Array<Tracker['id']>>
) => {
  const filteredTrackers = state.trackers.filter((t) => action.payload.includes(t.id));
  for (const tracker of filteredTrackers) {
    tracker.endDate = undefined;
    tracker.status = TrackerStatus.active;
  }
};

export { unarchiveTrackersReducer };
