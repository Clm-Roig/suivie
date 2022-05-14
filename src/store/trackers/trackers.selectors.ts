import {
  differenceInDays,
  isAfter,
  isBefore,
  isEqual,
  isSameMonth,
  isSameYear,
  startOfDay
} from 'date-fns';

import TrackerEntry from '../../models/TrackerEntry';
import { RootState } from '../store';
import {
  computeIfDone,
  formatTrackers,
  removeArchivedTrackers,
  removeHiddenTrackers
} from './utils';

const selectTracker = (state: RootState, trackerId: string) => {
  return state.trackers.trackers.find((t) => t.id === trackerId);
};

const selectHiddenTrackers = (state: RootState) => {
  const newTrackers = removeArchivedTrackers(
    formatTrackers(state.trackers.trackers).filter((t) => t.dateHidden !== undefined)
  );
  return {
    ...state.trackers,
    trackers: newTrackers
  };
};

const selectTrackersDone = (state: RootState, date?: Date) => {
  const newTrackers = removeArchivedTrackers(
    removeHiddenTrackers(formatTrackers(state.trackers.trackers))
  ).filter(
    (t) =>
      computeIfDone(t, date) &&
      isBefore(startOfDay(new Date(t.beginDate)), date ? date : new Date())
  );

  return {
    ...state.trackers,
    trackers: newTrackers
  };
};

const selectTodoTrackers = (state: RootState, date?: Date) => {
  const newTrackers = removeArchivedTrackers(
    removeHiddenTrackers(formatTrackers(state.trackers.trackers))
  ).filter(
    (t) =>
      !computeIfDone(t, date) &&
      isBefore(startOfDay(new Date(t.beginDate)), date ? date : new Date())
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
  const tracker = selectTracker(state, trackerId);
  if (tracker) {
    return tracker.entries.filter((e) => isSameYear(yearDate, new Date(e.date)));
  } else return [];
};

const selectMonthEntries = (
  state: RootState,
  monthDate: Date,
  trackerId: string
): TrackerEntry[] => {
  const tracker = selectTracker(state, trackerId);
  if (tracker) {
    return tracker.entries.filter((e) => isSameMonth(monthDate, new Date(e.date)));
  } else return [];
};

const selectWeekEntries = (
  state: RootState,
  beginDate: Date,
  trackerId: string
): TrackerEntry[] => {
  const tracker = selectTracker(state, trackerId);
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

const selectSelectedDate = (state: RootState) => {
  return state.trackers.selectedDate;
};

export {
  selectAllTrackers,
  selectTrackersDone,
  selectHiddenTrackers,
  selectTodoTrackers,
  selectYearEntries,
  selectMonthEntries,
  selectWeekEntries,
  selectSelectedDate
};
