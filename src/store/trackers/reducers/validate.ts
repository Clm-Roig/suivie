import { PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

import Completion from '../../../models/Completion';
import TrackerEntry from '../../../models/TrackerEntry';
import TrackersState from '../TrackersState';
import { computeIfDone } from '../utils';
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
    trackerFound.doneDays.push((date ? date : new Date()).toString());
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
  const stringDate = (date ? date : new Date()).toString();
  if (trackerFound) {
    trackerFound.entries.push({
      id: v4(),
      completions: completions,
      date: stringDate,
      trackerId: trackerFound.id
    } as TrackerEntry);
    if (computeIfDone(trackerFound, new Date(stringDate))) {
      trackerFound.doneDays.push(stringDate);
    }
  }
  return state;
};

export { completelyValidateReducer, customValidateReducer };
