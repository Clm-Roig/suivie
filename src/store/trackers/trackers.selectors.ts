import { differenceInDays, isAfter, isEqual, isSameMonth, isSameYear } from 'date-fns';

import TrackerEntry from '../../models/TrackerEntry';
import { RootState } from '../store';
import {
  formatTrackers,
  removeArchivedTrackers,
  removeDoneTrackers,
  removeHiddenTrackers
} from './utils';

const selectHiddenTrackers = (state: RootState) => {
  const newTrackers = removeArchivedTrackers(
    formatTrackers(state.trackers.trackers).filter((t) => t.dateHidden !== undefined)
  );
  return {
    ...state.trackers,
    trackers: newTrackers
  };
};

const selectTrackersDone = (state: RootState) => {
  const newTrackers = removeArchivedTrackers(
    removeHiddenTrackers(formatTrackers(state.trackers.trackers).filter((t) => t.isDoneForToday))
  );

  return {
    ...state.trackers,
    trackers: newTrackers
  };
};

const selectTodoTrackers = (state: RootState) => {
  const newTrackers = removeArchivedTrackers(
    removeHiddenTrackers(removeDoneTrackers(formatTrackers(state.trackers.trackers)))
  );
  return {
    ...state.trackers,
    trackers: newTrackers
  };
};

const selectAllTrackers = (state: RootState) => {
  const newTrackers = formatTrackers(state.trackers.trackers);
  return {
    ...state.trackers,
    trackers: newTrackers
  };
};

const selectYearEntries = (state: RootState, yearDate: Date, trackerId: string): TrackerEntry[] => {
  const tracker = state.trackers.trackers.find((t) => t.id === trackerId);
  if (tracker) {
    return tracker.entries.filter((e) => isSameYear(yearDate, new Date(e.date)));
  } else return [];
};

const selectMonthEntries = (
  state: RootState,
  monthDate: Date,
  trackerId: string
): TrackerEntry[] => {
  const tracker = state.trackers.trackers.find((t) => t.id === trackerId);
  if (tracker) {
    return tracker.entries.filter((e) => isSameMonth(monthDate, new Date(e.date)));
  } else return [];
};

const selectWeekEntries = (
  state: RootState,
  beginDate: Date,
  trackerId: string
): TrackerEntry[] => {
  const tracker = state.trackers.trackers.find((t) => t.id === trackerId);
  if (tracker) {
    return tracker.entries
      .filter((e) => {
        const isEqualBeginDate = isEqual(new Date(e.date), beginDate);
        const isAfterBeginDate = isAfter(new Date(e.date), beginDate);
        const less7Days = differenceInDays(new Date(e.date), beginDate) < 7;
        return (isEqualBeginDate || isAfterBeginDate) && less7Days;
      })
      .flatMap((e) => e);
  } else return [];
};

export {
  selectAllTrackers,
  selectTrackersDone,
  selectHiddenTrackers,
  selectTodoTrackers,
  selectYearEntries,
  selectMonthEntries,
  selectWeekEntries
};
