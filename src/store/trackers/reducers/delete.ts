import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackersState from '../TrackersState';

const deleteTrackerReducer = (state: TrackersState, action: PayloadAction<Tracker['id']>) => {
  const filteredTrackers = state.trackers.filter((t) => t.id !== action.payload);
  return {
    ...state,
    trackers: filteredTrackers
  };
};
const deleteTrackersReducer = (
  state: TrackersState,
  action: PayloadAction<Array<Tracker['id']>>
) => {
  const filteredTrackers = state.trackers.filter((t) => !action.payload.includes(t.id));
  return {
    ...state,
    trackers: filteredTrackers
  };
};

export { deleteTrackerReducer, deleteTrackersReducer };
