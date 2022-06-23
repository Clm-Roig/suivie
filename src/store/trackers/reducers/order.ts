import { PayloadAction } from '@reduxjs/toolkit';

import TrackersState from '../TrackersState';

export type Indexes = {
  trackerIdSource: string;
  trackerIdDestination: string;
};

const orderTrackerReducer = (state: TrackersState, action: PayloadAction<Indexes>) => {
  const { trackerIdSource, trackerIdDestination } = action.payload;
  const sourceIndex = state.trackers.findIndex((t) => t.id === trackerIdSource);
  const destinationIndex = state.trackers.findIndex((t) => t.id === trackerIdDestination);
  if (sourceIndex !== -1 && destinationIndex !== -1) {
    const tracker = state.trackers.splice(sourceIndex, 1)[0];
    state.trackers.splice(destinationIndex, 0, tracker);
  }
};

export { orderTrackerReducer };
