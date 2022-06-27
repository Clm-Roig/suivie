import { PayloadAction } from '@reduxjs/toolkit';

import TrackersState from '../TrackersState';

export type Indexes = {
  sourceTrackerId: string;
  destinationTrackerId: string;
};

const orderTrackerReducer = (state: TrackersState, action: PayloadAction<Indexes>) => {
  const { sourceTrackerId, destinationTrackerId } = action.payload;
  const sourceIndex = state.trackers.findIndex((t) => t.id === sourceTrackerId);
  const destinationIndex = state.trackers.findIndex((t) => t.id === destinationTrackerId);
  if (sourceIndex !== -1 && destinationIndex !== -1) {
    const tracker = state.trackers.splice(sourceIndex, 1)[0];
    state.trackers.splice(destinationIndex, 0, tracker);
  }
};

export { orderTrackerReducer };
