import { PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

import Completion from '../../../models/Completion';
import Tracker from '../../../models/Tracker';
import TrackerEntry from '../../../models/TrackerEntry';
import TrackersState from '../TrackersState';

const completelyValidateReducer = (state: TrackersState, action: PayloadAction<Tracker['id']>) => {
  const trackerFound = state.trackers.find((t) => t.id === action.payload);
  if (trackerFound) {
    trackerFound.entries.push({
      id: v4(),
      completions: trackerFound.requiredCompletions,
      date: new Date().toString(),
      trackerId: trackerFound.id
    } as TrackerEntry);
  }
  return state;
};

const customValidateReducer = (
  state: TrackersState,
  action: PayloadAction<{ id: Tracker['id']; completions: Completion[] }>
) => {
  const trackerFound = state.trackers.find((t) => t.id === action.payload.id);
  if (trackerFound) {
    trackerFound.entries.push({
      id: v4(),
      completions: action.payload.completions,
      date: new Date().toString(),
      trackerId: trackerFound.id
    } as TrackerEntry);
  }
  return state;
};

export { completelyValidateReducer, customValidateReducer };
