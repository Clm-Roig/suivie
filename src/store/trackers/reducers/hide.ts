import { PayloadAction } from '@reduxjs/toolkit';

import Tracker from '../../../models/Tracker';
import TrackersState from '../TrackersState';

type PayloadType = {
  id: Tracker['id'];
  date?: Date;
};

const hideTrackerReducer = (state: TrackersState, action: PayloadAction<PayloadType>) => {
  const { id, date } = action.payload;
  const idx = state.trackers.findIndex((t) => t.id === id);
  if (idx !== -1) {
    state.trackers[idx].dateHidden = (date ? date : new Date()).toString();
  }
};

export { hideTrackerReducer };
