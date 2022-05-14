import { PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

import Completion from '../../../models/Completion';
import TrackerEntry from '../../../models/TrackerEntry';
import TrackersState from '../TrackersState';
import { TrackerIdAndDate } from './types';

const completelyValidateReducer = (
  state: TrackersState,
  action: PayloadAction<TrackerIdAndDate>
) => {
  const { id, date } = action.payload;
  const trackerFound = state.trackers.find((t) => t.id === id);
  if (trackerFound) {
    trackerFound.entries.push({
      id: v4(),
      completions: trackerFound.requiredCompletions,
      date: (date ? date : new Date()).toString(),
      trackerId: trackerFound.id
    } as TrackerEntry);
  }
  return state;
};

type TrackerIdWithDateAndCompletions = TrackerIdAndDate & {
  completions: Completion[];
};

const customValidateReducer = (
  state: TrackersState,
  action: PayloadAction<TrackerIdWithDateAndCompletions>
) => {
  const { id, date, completions } = action.payload;
  const trackerFound = state.trackers.find((t) => t.id === id);
  if (trackerFound) {
    trackerFound.entries.push({
      id: v4(),
      completions: completions,
      date: (date ? date : new Date()).toString(),
      trackerId: trackerFound.id
    } as TrackerEntry);
  }
  return state;
};

export { completelyValidateReducer, customValidateReducer };
